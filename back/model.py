# pip install flask
# pip install flask-cross
# pip install deepface
# pip install opencv-python

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from deepface import DeepFace
import cv2
import base64
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/detect_emotion", methods=["POST"])
@cross_origin()  
def detect_emotion():
    try:
        # Get image data from request
        image_data = request.json["image"]

        # Decode Base64 image string
        img_data = base64.b64decode(image_data.split(',')[1])
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Detect emotion
        result = DeepFace.analyze(img, actions=['emotion'])
        emotion = result[0]['dominant_emotion']
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
            "sad": "sad"
            # Add more emotions and their corresponding categories as needed
        }

        # Check if the detected emotion is mapped to a category
        if detected_emotion in emotion_category_mapping:
            emotion_category = emotion_category_mapping[detected_emotion]
        else:
            # If the detected emotion doesn't match any category, recommend a neutral movie
            emotion_category = "neutral"

        # Filter movies based on the mapped emotion category
        filtered_movies = df[df['sentiment'] == emotion_category]

        # Check if any movies were found for the mapped emotion category
        if filtered_movies.empty:
            return jsonify({"error": f"No movies found for {emotion_category} emotion"}), 404

        # Select a random movie from the filtered list
        recommended_movie = filtered_movies.sample(n=1)

        # Extract movie details
        movie_details = recommended_movie.to_dict(orient='records')[0]
        
        # Return movie details as a dictionary
        return jsonify(movie_details), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)