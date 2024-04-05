import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import axios from "axios";
import "./FeatureCard.css"

const FeatureCard = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const RemoveFromFavorites = async () => {
        try {
            const yourAccessToken = sessionStorage.getItem('token');
            const response = await axios.delete('http://localhost:5000/removefromfavoris', {
                headers: {
                    Authorization: `Bearer ${yourAccessToken}`
                },
                data: { title: props.title }
            });
            if (response.status === 200) {
                setIsFavorite(false);
                props.refreshProfile();
            } else {
                alert('remove from favorites failed');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    const favoris = async () =>{
        try {
            const yourAccessToken = sessionStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/favoris', {
                title: props.title,
                rate: props.rate,
                Shortsummary: props.shortsummary
            }, {
                headers: {
                    Authorization: `Bearer ${yourAccessToken}`
                }
            });
            if (response.status === 200) {
                console.log("The movie has been added successfully. Don't forget to watch it later:)");
                setIsFavorite(true);
            } else {
                alert('add to favorites failed');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }

    return (
        <div className="card element-body">
            <div className="card-header" >
                <img className='imgg' alt="" src="images/favorispic3.png"/>
            </div>
            <div className="card-body">
                <p>
                    <span style={{color:"#abece9" , fontWeight:"700",paddingRight:"10px"}} >Title:</span>
                    <span style={{color:"white" , fontWeight:"700"}}>{props.title}</span><br></br>
                    <span style={{color:"#abece9",fontWeight:"500",paddingRight:"10px"}} >Short Summary:</span>
                    <span style={{color:"white",fontWeight:"400"}}>{props.shortsummary}</span><br></br> 
                    <span style={{color:"#abece9",listStyleType:"none",paddingRight:"10px"}}>Rate:</span>
                    <span style={{color:"white",listStyleType:"none"}}>{props.rate}<FaStar style={{ color: "#ede607",transform:"translate(0px,-3px)",marginLeft:"7px"}}/> </span><br></br>
                    <p style={{color:"#abece9",fontWeight:"500",paddingRight:"10px"}}>
                        Remove of favorites: 
                        <button onClick={isFavorite ? RemoveFromFavorites : favoris} type="button" className="btn btn-outline-secondary" style={{ borderColor:"transparent",transform:"translate(0px,-3px)" }}>
                            {isFavorite ? <MdOutlineFavorite style={{fontSize: "25px"}}/> : <GrFavorite style={{fontSize: "25px"}}/>}
                        </button>
                    </p>
                </p>
            </div>
        </div>
    );
}

export default FeatureCard;
