# pip install flask
# pip install flask-cross
# pip install deepface
# pip install opencv-python

from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
from deepface import DeepFace
import cv2
import base64
import numpy as np
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from bson.json_util import dumps
from pymongo import MongoClient
from datetime import timedelta
import pandas as pd
import re

app = Flask(__name__)
CORS(app)
client = MongoClient("localhost", 27017)
db = client.moviematcher
users = db.users
app.config["JWT_SECRET_KEY"] = "skjdfbnbsrkjgb14541616"
jwt = JWTManager(app)


@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    name = request.json["name"]
    phone = request.json["phone"]
    password = request.json["password"]
    image = request.json["image"]

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"msg": "Format d'email invalide"}), 401

    existing_email = users.find_one({"email": email})
    if existing_email is not None:
        return jsonify({"msg": "Email déjà utilisé par un autre utilisateur"}), 402
    if not phone.isdigit():
        return (
            jsonify(
                {"msg": "Le numéro de téléphone doit contenir uniquement des chiffres"}
            ),
            403,
        )
    existing_password = users.find_one({"password": password})
    if existing_password is not None:
        return (
            jsonify({"msg": "Mot de passe déjà utilisé par un autre utilisateur"}),
            404,
        )
    users.insert_one(
        {
            "name": name,
            "phone": phone,
            "email": email,
            "password": password,
            "image": image,
        }
    )
    return jsonify({"msg": "Profil mis à jour avec succès"}), 200


# @jwt.expired_token_loader
# def handle_expired_token_callback(expired_token):
#     return redirect("/login")


@app.route("/login", methods=["POST"])
def login():
    expires_in = timedelta(days=1)
    email = request.json["email"]
    password = request.json["password"]
    user = users.find({"$and": [{"email": email}, {"password": password}]})
    user_info = list(user)
    if user_info:
        access_token = create_access_token(identity=password, expires_delta=expires_in)
        return jsonify(access_token=access_token), 200

    else:
        return jsonify({"msg": "ce compte n'existe pas"}), 401


@app.route("/editprofil", methods=["PUT"])
@jwt_required()
def editprofil():
    email = request.json["email"]
    name = request.json["name"]
    phone = request.json["phone"]
    image = request.json["image"]
    current_user_password = get_jwt_identity()
    users.update(
        {"password": current_user_password},
        {"$set": {"name": name, "phone": phone, "email": email, "image": image}},
    )
    return jsonify({"msg": "Profile updated successfully"}), 200


@app.route("/user_info", methods=["GET"])
@jwt_required()
def user_info():
    current_user_password = get_jwt_identity()
    user_info_cursor = users.find({"password": current_user_password})
    user_info = list(user_info_cursor)
    if user_info:
        return dumps(user_info), 200
    else:
        return jsonify({"msg": "User not found"}), 404


@app.route("/detect_emotion", methods=["POST"])
@cross_origin()
def detect_emotion():
    try:

        image_data = request.json["image"]

        img_data = base64.b64decode(image_data.split(",")[1])
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        result = DeepFace.analyze(img, actions=["emotion"])
        emotion = result[0]["dominant_emotion"]
        return jsonify({"emotion": emotion}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


df = pd.read_csv("cleanedMovies.csv")


@app.route("/recommend_movies", methods=["POST"])
@cross_origin()  # Enable CORS for this route
def recommend_movies():
    try:
        # Get the detected emotion from the request
        detected_emotion = request.json.get("emotion")

        if detected_emotion is None:
            return jsonify({"error": "No emotion detected in request"}), 400

        # Map detected emotions to movie categories
        emotion_category_mapping = {
            "happy": "happy",
            "sad": "sad",
            # Add more emotions and their corresponding categories as needed
        }

        # Check if the detected emotion is mapped to a category
        if detected_emotion in emotion_category_mapping:
            emotion_category = emotion_category_mapping[detected_emotion]
        else:
            # If the detected emotion doesn't match any category, recommend a neutral movie
            emotion_category = "neutral"

        # Filter movies based on the mapped emotion category
        filtered_movies = df[df["sentiment"] == emotion_category]

        # Check if any movies were found for the mapped emotion category
        if filtered_movies.empty:
            return (
                jsonify({"error": f"No movies found for {emotion_category} emotion"}),
                404,
            )

        # Select a random movie from the filtered list
        recommended_movie = filtered_movies.sample(n=1)

        # Extract movie details
        movie_details = recommended_movie.to_dict(orient="records")[0]

        # Return movie details as a dictionary
        return jsonify(movie_details), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
