import React, { useState }  from 'react';
import { Link } from "react-router-dom";
import './Features.css'
import axios from 'axios';
import FeatureCard from "./FeatureCard";

const Features = () => {

    const [rolling, setRolling] = useState(false);
    const [movieDetails,setMovieDetails] = useState(null);

    const rollDice = () => {
      setRolling(true);
      setTimeout(() => {
        setRolling(false);
      }, 500); 
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
            setMovieDetails(movieDetails);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    
    const randomClick = () => {
        rollDice();
        sendPostRequest("neutral");
      };      

    return (
        <div className='mainContainer '>
          
            <div className='leftContainer '>
                {movieDetails && ( <FeatureCard
                        shortsummary={movieDetails['Short Summary']}
                        title={movieDetails.Title}
                        rate={movieDetails.Rating}
                    />
                )}
            </div>
        

            <div className='rightContainer'>
                <div className='category'>
                    <h2 className='moodCategoryTitle'> What's your mood ?</h2>
                    <div className='moodCategory'>
                        <button className='moodImage' onClick={() => sendPostRequest("happy")}><img src='images/happy.png' alt='happy' /> </button> 
                        <button className='moodImage' onClick={() => sendPostRequest("neutral")}><img src='images/neutral.png' alt='neutral' /></button>
                        <button className='moodImage' onClick={() => sendPostRequest("sad")}><img src='images/sad.png' alt='sad'/></button>
                        <button className='moodImage' onClick={() => sendPostRequest("neutral")}><img src='images/angry.png' alt='angry'/></button>
                        <button className='moodImage' onClick={() => sendPostRequest("neutral")}><img src='images/lonely.png' alt='lonely'/></button> 
                    </div> 
                </div>

                <div className='row '>
                <div className='randomCategory category'>
                    <button className='diceImage'  onClick={randomClick}>
                    {rolling ? (
                        <img src="images/dice.gif" alt="Rolling Dice" />
                    ) : (
                        <img src="images/static-dice.gif" alt="Static Dice" />
                    )}
                    <h2 className='moodCategoryTitle'>Pick a random movie</h2>
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