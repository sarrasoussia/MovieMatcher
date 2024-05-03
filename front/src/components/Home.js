import { Component } from "react";
import { Link } from "react-router-dom";
import Services from './Services'
import Slider from "./Slider";
import Goal from "./goal";
import './Home.css'
class Home extends Component{
    render(){
        return(
            <div >
                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", marginTop: "120px", paddingBottom: "60px", borderBottom: "2.5px solid black", width: "100%" }}>
                    {/* <h1 className=" text-white text-center display-1 py-3" style={{fontFamily: "cinematic",fontSize:"60px"}}> Check <span style={{color:"red"}}> Features !</span> </h1> */}
                    <Slider />
                </div>

                <div className="row" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", paddingTop: "40px",paddingBottom: "40px", borderBottom: "2.5px solid black", width: "100%" ,transform:"translate(14px,0px)"}}>
                    <img className="col-4" src="images/cccc.png" alt=""/>
                    <p className="text-white text-center py-5 col-6" style={{marginLeft:"140px"}}>
                        <em style={{ color: "whitesmoke", fontWeight: "800", fontSize: "25px" }}> Join Us For <em style={{ color: "#ec6090" }}>Free</em></em><br></br>
                        <p style={{fontWeight: "440"}}>Movie Matcher provides users with the opportunity to generate personalized movie recommendations through two distinct methods. Firstly, it analyzes the user's mood, utilizing advanced algorithms to interpret emotions and suggest films that align with their current emotional state. Whether you're feeling upbeat, contemplative, or in need of a good laugh, Movie Matcher tailors its suggestions to suit your mood perfectly. Additionally, for those who prefer a more straightforward approach, Movie Matcher offers category-based recommendations. Users can easily navigate through genres, themes, and preferences to discover movies that cater to their specific tastes and interests. Whether you're seeking an adrenaline-pumping action flick, a heartwarming romance, or a spine-tingling thriller, Movie Matcher ensures that you'll find the perfect cinematic experience for any occasion.</p>
                        <button type="button" className="btn btn-outline-secondary buttonn">
                            {sessionStorage.getItem("token") ? (
                                // If token exists, display alert
                                <span onClick={() => alert("You already have an account.")} className="text-white" style={{ cursor: "pointer" }}>Join now</span>
                            ) : (
                                // If token doesn't exist, link to sign-up page
                                <Link className="text-white" style={{ textDecoration: "none" }} to="/signup">Join now</Link>
                            )}
                        </button>
                    </p>
                </div>

                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", paddingTop: "40px",paddingBottom: "40px", borderBottom: "2.5px solid black", width: "100%" }}>
                <Services />
                <br/>
                </div>
                
                <div className="row" style={{ background: "linear-gradient(to top, rgba(255,255,255,0), rgba(0, 0, 0, 0.2))",paddingLeft:"8%" ,paddingTop: "28px",paddingBottom: "28px", borderBottom: "2.5px solid black", width: "100%" ,textAlign:"center"}}>
                    <em className="col-12" style={{ color: "whitesmoke", fontWeight: "800", fontSize: "25px",marginBottom:"20px",transform:"translate(-60px,0px)"}}>Our <em style={{ color: "rgb(227, 144, 144)" }}>Goals</em></em><br></br>
                    <div className="col-4">
                        <Goal title="Simplify Movie Selection" description="We aim to simplify the process of selecting a movie by offering tailored recommendations based on the user's mood and preferences."/>
                    </div>
                    <div className="col-4">
                        <Goal title="Enhance User Experience" description="We strive to provide a seamless and enjoyable user experience by offering intuitive navigation, visually appealing design, and easy-to-understand features." />
                    </div>
                    <div className="col-4">
                        <Goal title="Improve Decision-Making" description="we help users make informed decisions by providing comprehensive information about each recommended movie, including summaries and ratings."/>
                    </div>
                   
                </div>

            </div>
        );
    }
}

export default Home;
