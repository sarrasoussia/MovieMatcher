import { Component } from "react";
import './About.css'
import Developer from "./Developer";
class About extends Component{
    render(){
        return(
            <div className="py-5">
                <p className="text-white text-center display-1 py-2" style={{ fontFamily: "cinematic",fontSize:"65px", transform:"translate(0px,35px)"}}> Movie Mood <span style={{ color: "#ec6090" }}>Matcher</span></p>
                   
                    {/* <div className="container-fluid card" style={{width:"60%"}}>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" 
                                    src="https://www.youtube.com/embed/tgbNymZ7vqY"   
                                    title="YouTube video player" 
                                    allowFullScreen 
                            />
                                    
                        </div>
                    </div> */}

                <div className="row" style={{  paddingTop: "40px",paddingBottom: "40px", borderBottom: "2.5px solid black", width: "100%" ,transform:"translate(14px,0px)"}}>
                    <img className="col-3" src="images/a1.png" alt="" style={{marginLeft:"40px",transform:"translate(50px,-25px)"}}/>
                    <p className="text-white text-center py-5 col-6" style={{marginLeft:"140px"}}>
                        <p style={{fontWeight: "440"}}>
                        This dilemma is particularly relevant in the realm of entertainment, where the sheer volume of movies, TV shows, and streaming platforms can leave consumers feeling perplexed about what to watch. In response to this challenge, innovative solutions are emerging to help users navigate the sea of choices and find content that resonates with their preferences and moods.
                        <p></p>
                        One such solution is the development of movie mood matcher web applications, which leverage advanced technologies to assist users in discovering films that align with their emotional state. By integrating features such as emotion detection and sentiment analysis, these applications aim to streamline the selection process and enhance user satisfaction in the ever-expanding landscape of entertainment options.
                        </p>
                    </p>
                </div>
                <div style={{ borderBottom: "2.5px solid black", width: "100%" }}>
                    <p className="text-white text-center display-1 py-2" style={{ fontFamily: "cinematic",fontSize:"75px", transform:"translate(0px,25px)",marginBottom:"30px"}}> Dev <span style={{ color: "#ec6090" }}>Team</span></p>
                   
                    <div className="row mx-auto ">
                        <div className="col-md-4 ">
                            <Developer 
                                image="images/moh.png"
                                name="Jawadi Mouhanned"
                                description="Responsible for frontend developement"
                            
                            />
                        </div>
                        <div className="col-md-4">
                            <Developer 
                                image="images/sarra.png"
                                name="Soussia Sarra"
                                description="Responsible for backend developement"
                            />
                        </div>
                        <div className="col-md-4 ">
                            <Developer 
                                image="images/ala.png"                                
                                name="Bhiri Ghoul Ala"
                                description="Responsible for ai developement"
                            />
                        </div>
                    </div>
                </div>    

            </div>
        );
    }
}

export default About;