import React, { Component } from "react";
import './Contact.css';

class Contact extends Component {
    render() {
        return (
            <div className="py-5" style={{background: "linear-gradient(to top, rgba(255,255,255,0), rgba(0, 0, 0, 0.2))"}}>
                <p className="text-white text-center display-1 py-2" style={{ fontFamily: "cinematic",fontSize:"65px", transform:"translate(0px,35px)"}}> Movie Mood <span style={{ color: "rgba(116, 229, 244, 0.714)" }}>Matcher</span></p>

                <div className="row content" style={{  paddingTop: "60px",paddingBottom: "120px", borderBottom: "2.5px solid black", width: "100%" ,transform:"translate(14px,0px)"}}>
                    <div className="img-container">
                    <img src="/images/contact2.png" alt="contact us" />
                    </div>
                    <p className="text-white text-center py-5 " style={{marginLeft:"140px"}}>

                        <p style={{ fontFamily: "cinematic",fontSize:"30px"}}>Tell us what do you think of Movie Mood Matcher?</p>
                        <form>
                            <div className="mb-3">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" placeholder="Report a bug, tell us your feedback, send us a message..."></textarea>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-outline-secondary w-100 text-white bouton">Send</button>
                                <br />
                            </div>
                        </form>                    
                    </p>
                </div>
            </div>
          
        );
    }
}

export default Contact;
