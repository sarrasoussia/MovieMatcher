from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from deepface import DeepFace
import cv2
import base64
import numpy as np

app = Flask(__name__)
CORS(app)
client = MongoClient("localhost", 27017)
db = client.moviematcher
users = db.users


app.config["JWT_SECRET_KEY"] = "skjdfbnbsrkjgb14541616"
jwt = JWTManager(app)


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
        return jsonify({"msg": "Bad username or password hhhhhhhhhhhhhHHHHH"}), 401


# @app.route("/signup", methods=["POST"])
# def signup():
#     email = request.json["email"]
#     name = request.json["name"]
#     phone = request.json["phone"]
#     password = request.json["password"]
#     image = request.json["image"]
#     users.insert(
#         {
#             "name": name,
#             "phone": phone,
#             "email": email,
#             "password": password,
#             "image": image,
#         }
#     )
#     return jsonify({"msg": "Profile updated successfully"}), 200
@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    name = request.json["name"]
    phone = request.json["phone"]
    password = request.json["password"]
    image = request.json["image"]
    users.insert_one(
        {
            "name": name,
            "phone": phone,
            "email": email,
            "password": password,
            "image": image,
        }
    )
    return jsonify({"msg": "Profile updated successfully"}), 200


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

    # user_info_cursor = users.find({"password": current_user_password})
    # user_info = list(user_info_cursor)
    # if user_info:
    #     return dumps(user_info), 200
    # else:
    #     return jsonify({"msg": "User not found"}), 404


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
@cross_origin()  # Enable CORS for this route
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


if __name__ == "__main__":
    app.run(debug=True)
