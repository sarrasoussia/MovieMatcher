from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from deepface import DeepFace
import cv2
import base64
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/detect_emotion", methods=["POST"])
@cross_origin()  # Enable CORS for this route
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

if __name__ == "__main__":
    app.run(debug=True)