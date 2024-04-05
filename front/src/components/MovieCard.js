import React ,{Component} from 'react';
import { FaStar } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import axios from "axios";
import "./MovieCard.css"

class MovieCard extends Component{
    RemoveFromFavorites = async () => {
        try {
            const yourAccessToken = sessionStorage.getItem('token');
            const response = await axios.delete('http://localhost:5000/removefromfavoris', {
                headers: {
                    Authorization: `Bearer ${yourAccessToken}`
                },
                data: { title: this.props.title }
            });
            if (response.status === 200) {
                this.props.refreshProfile();
            } else {
                alert('remove from favorites failed');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }
    
    
    render(){
        return(
            <div className="card element-body">
                <div className="card-header" >
                {/* <p><span style={{color:"white" , fontWeight:"700",paddingRight:"21px"}} >Short Summary:</span><span style={{color:"white" , fontWeight:"700"}}>{this.props.shortsummary}</span><br></br></p> */}
                <img className='img' alt="" src="images/favorispic3.png"/>
                </div>
                <div className="card-body">
                    <p><span style={{color:"#abece9" , fontWeight:"700",paddingRight:"10px"}} >Title:</span><span style={{color:"white" , fontWeight:"700"}}>{this.props.title}</span><br></br>
                    <span style={{color:"#abece9",fontWeight:"500",paddingRight:"10px"}} >Short Summary:</span><span style={{color:"white",fontWeight:"400"}}>{this.props.shortsummary}</span><br></br> 
                    {/* <span style={{color:"gray",fontWeight:"500",paddingRight:"15px",marginLeft:"20px"}} >Genre:</span><span style={{color:"gray",fontWeight:"500"}}>{this.props.genre}</span><br></br> */}
                    <span style={{color:"#abece9",listStyleType:"none",paddingRight:"10px"}}>Rate:</span><span style={{color:"white",listStyleType:"none"}}>{this.props.rate}<FaStar style={{ color: "#ede607",transform:"translate(0px,-3px)",marginLeft:"7px"}}/> </span><br></br>
                    <p style={{color:"#abece9",fontWeight:"500",paddingRight:"10px"}}>Remove of favorites: <button onClick={this.RemoveFromFavorites} type="button" className="btn btn-outline-secondary" style={{ borderColor:"transparent",transform:"translate(0px,-3px)" }}><MdOutlineFavorite style={{fontSize: "25px"}}/></button></p></p>
                   
                </div>
            </div>
        )
    }
}
export default MovieCard;