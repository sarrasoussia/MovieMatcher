import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './WebcamPage.css';

const WebcamPage = () => {
  const [emotion, setEmotion] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [setError] = useState(null);
  const webcamRef = useRef(null);
  const capture = async () => {
    if (!webcamRef.current) {
      console.error('Webcam reference not available');
      return;
    }
  
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const response = await axios.post('http://localhost:5000/detect_emotion', { image: imageSrc });
  
      if (response.data && response.data.emotion) {
        const detectedEmotion = response.data.emotion;
        setEmotion(detectedEmotion);
        
        // After detecting emotion, request movie recommendation
        const recommendationsResponse = await axios.post('http://localhost:5000/recommend_movies', { emotion: detectedEmotion });
        setMovieDetails(recommendationsResponse.data);
      } else {
        console.error('No emotion detected in response');
      }
    } catch (error) {
      console.error('Error:', error);
      // setError(error.message);
    }
  };

  const MovieDetails = ({ movieDetails }) => {
    return (
      <div>
        <h2>{movieDetails.Title}</h2>
        <p>Year: {movieDetails.Year}</p>
        <p>Summary: {movieDetails.Summary}</p>
        <p>Short Summary: {movieDetails['Short Summary']}</p>
        <p>Runtime: {movieDetails.Runtime}</p>
        <p>Rating: {movieDetails.Rating}</p>
        <img src={movieDetails['Movie Poster']} alt={movieDetails.Title} />
      </div>
    );
  };
  
  return (
<div className="pageContainer">
    <div className="leftContainer">
    <h1 className="heading">Facial Emotion Detection</h1>
      <div className="webcamContainer">
        <div className="webcamWrapper">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
          <div className="resultEmotion row">
            <button onClick={capture} className="captureButton col-3">
              Detect Emotion
            </button>
            <p className="emotionResult col-6">
              Detected Emotion: <span className="emotion">{emotion}</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="rightContainer">
      <h1 className="heading">Movie Recommendation</h1>
      <div className="resultMovie">  
        {movieDetails && <MovieDetails movieDetails={movieDetails} />}
      </div>
    </div>
</div>


  );
};

export default WebcamPage;
