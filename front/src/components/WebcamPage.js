import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import './WebcamPage.css';

const WebcamPage = () => {
  const [emotion, setEmotion] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
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
        
        const recommendationsResponse = await axios.post('http://localhost:5000/recommend_movies', { emotion: detectedEmotion });
        setMovieDetails(recommendationsResponse.data);
      } else {
        console.error('No emotion detected in response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const favoris = async () =>{
    try {
      const yourAccessToken = sessionStorage.getItem('token');
      console.log(movieDetails)
      const response = await axios.put('http://localhost:5000/favoris', {
        title:movieDetails.Title,
        rate:movieDetails.Rating,
        Shortsummary:movieDetails['Short Summary']
      }, {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });
      if (response.status === 200) {
        setIsFavorite(true);
        console.log("The movie has been added successfully. Don't forget to watch it later:)");
      } else {
        alert('add to favorites failed');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  const RemoveFromFavorites = async () => {
    try {
        const yourAccessToken = sessionStorage.getItem('token');
        const response = await axios.delete('http://localhost:5000/removefromfavoris', {
            headers: {
                Authorization: `Bearer ${yourAccessToken}`
            },
            data: { title:movieDetails.Title }
        });
        if (response.status === 200) {
          console.log("The movie has been removed successfully.");
            setIsFavorite(false);
        } else {
            alert('remove from favorites failed');
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
  }

  const MovieDetails = ({ movieDetails }) => {
    return (
      <div>
        <h2>{movieDetails.Title}</h2>
        <p>Year: {movieDetails.Year}</p>
        <p>Summary: {movieDetails.Summary}</p>
        <p>Short Summary: {movieDetails['Short Summary']}</p>
        <p>Runtime: {movieDetails.Runtime}</p>
        <p>Rating: {movieDetails.Rating}</p>
        <p>Add to favorites: <button onClick={isFavorite ? RemoveFromFavorites : favoris} type="button" className="btn btn-outline-secondary" style={{ borderColor:"transparent",transform:"translate(0px,-3px)" }}>
           {isFavorite ? <MdOutlineFavorite style={{fontSize: "32px"}}/> : <GrFavorite style={{fontSize: "30px"}}/>}</button></p>                       
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
