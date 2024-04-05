import React, { useState }  from 'react';
import { Link, json } from "react-router-dom";
import './Features.css'
import axios from 'axios';
import FeatureCard from "./FeatureCard";
import { formToJSON } from 'axios';

const Features = () => {

    const [rolling, setRolling] = useState(false);
    const [movieDetails,setMovieDetails] = useState(null);

    const rollDice = () => {
      setRolling(true);
      setTimeout(() => {
        setRolling(false);
      }, 1000); // 2 seconds
    };

    const sendPostRequest = async (emotion) => {
        try {
            console.log(emotion);
            const response = await axios.post("http://localhost:5000/recommend_movies", {emotion}, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const movieDetails = response.data;
            console.log(movieDetails);
            // Example: Update state with movieDetails
            setMovieDetails(movieDetails);
        } catch (error) {
            // Handle errors
            console.error("Error:", error);
        }
    };
    
    
      

    return (
        <div className='mainContainer '>
          
            <div className='leftContainer '>
                {movieDetails && ( <FeatureCard
                        shortsummary={movieDetails['Short Summary']}
                        title={movieDetails.Title}
                        rate={movieDetails.Rating}
                    />
                    /* <h2 style={{color:"white"}} id="movieTitle">{movieDetails.Title}</h2>
                    <p style={{color:"white"}} id="movieDescription">{movieDetails.Summary}</p> */
                )}
            </div>
        

            <div className='rightContainer'>
                <div className='category'>
                    <h2 className='moodCategoryTitle'> What's your mood ?</h2>
                    <div className='moodCategory'>
                        <button onClick={() => sendPostRequest("happy")}><img  style={{width:"80%",height:"80%"}} src='images/happy.png' alt='happy' /> </button> 
                        <button onClick={() => sendPostRequest("sad")}><img style={{width:"80%",height:"80%"}} src='images/sad.png' alt='sad'/></button>
                        <button onClick={() => sendPostRequest("neutral")}><img style={{width:"80%",height:"80%"}} src='images/angry.png' alt='angry'/></button>
                        {/* <button onClick={() => sendPostRequest({"emotion":"neutral"})}><img src='images/neutral.png' alt='neutral' /></button>
                        <button onClick={() => sendPostRequest({"emotion":"neutral"})}><img src='images/lonely.png' alt='lonely'/></button> */}
                    </div> 
                </div>

                <div className='row '>
                <div className='randomCategory category'>
                    <button className='diceImage'  onClick={rollDice}>
                    {rolling ? (
                        <img src="images/dice.gif" alt="Rolling Dice" />
                    ) : (
                        <img src="images/static-dice.gif" alt="Static Dice" />
                    )}
                    <h2>Pick a random movie</h2>
                    </button>
                </div>
                
                <div className='webcamCtagory category'>
                    <Link className='webcamLink'  to='/webcam'>Try facial emotions detection!
                    <img alt='facial emotion detection' src='images/faceDetection.gif'/>
                    </Link>
                </div>
                </div>

            </div>

        </div>
    );
};

export default Features; 