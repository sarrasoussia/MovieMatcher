import React, { useState }  from 'react';
import { Link, json } from "react-router-dom";
import './Features.css'
import { formToJSON } from 'axios';

const Features = () => {

    const [rolling, setRolling] = useState(false);

    const rollDice = () => {
      setRolling(true);
      setTimeout(() => {
        setRolling(false);
      }, 1000); // 2 seconds
    };
  
    const [movieDetails] = useState(null);

    const sendPostRequest = (emotion) => {
        fetch("/recommend_movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: ( emotion )
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok", emotion);
            }
            return response.json();
        })
        .then(movieDetails => {
            // Handle movie details
            console.log(movieDetails);
            // Example: Update state with movieDetails
            // setMovieDetails(movieDetails);
        })
        .catch(error => {
            // Handle errors
            console.error("Error:", error);
        });
    }
    
    // const sendPostRequest = (emotion) => {
    //     getRandomMovie(emotion);
    //     console.log(emotion);
    //     console.log(typeof(emotion));
    // }
    
    
    // const displayMovieDetails = (movieDetails) => {
    //     // Update UI with movie details
    //     const movieTitleElement = document.getElementById("movieTitle");
    //     const movieDescriptionElement = document.getElementById("movieDescription");
    
    //     movieTitleElement.textContent = movieDetails.title;
    //     movieDescriptionElement.textContent = movieDetails.description;
    // }
    
    
      

    return (
        <div className='mainContainer '>
            <div className='leftContainer '>
                <h2 id="movieTitle">{movieDetails && movieDetails.title}</h2>
                <p id="movieDescription">{movieDetails && movieDetails.description}</p>
            </div>

            <div className='rightContainer'>
                <div className='category'>
                    <h2 className='moodCategoryTitle'> What's your mood ?</h2>
                    <div className='moodCategory'>
                        <button onClick={() => sendPostRequest({"emotion":"happy"})}><img src='images/happy.png' alt='happy' /> </button> 
                        <button onClick={() => sendPostRequest({"emotion":"sad"})}><img src='images/sad.png' alt='sad'/></button>
                        <button onClick={() => sendPostRequest({"emotion":"neutral"})}><img src='images/angry.png' alt='angry'/></button>
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