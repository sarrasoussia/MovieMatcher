import React, { Component } from "react";
import './Contact.css';

class Contact extends Component {
    render() {
        return (
            <div className="py-5" style={{background: "linear-gradient(to top, rgba(255,255,255,0), rgba(0, 0, 0, 0.2))"}}>
                <p className="text-white text-center display-1 py-2" style={{ fontFamily: "cinematic",fontSize:"65px", transform:"translate(0px,35px)"}}> Movie Mood <span style={{ color: "rgba(116, 229, 244, 0.714)" }}>Matcher</span></p>

                <div className="row" style={{  paddingTop: "60px",paddingBottom: "120px", borderBottom: "2.5px solid black", width: "100%" ,transform:"translate(14px,0px)"}}>
                    <img className="col-3" src="/images/contact2.png" alt="" style={{marginLeft:"40px",transform:"translate(50px,-25px)"}}/>
                    <p className="text-white text-center py-5 col-6" style={{marginLeft:"140px"}}>
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control text-dark" id="exampleInputPassword1"  placeholder="Name" />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder="Email address" />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Problem description"></textarea>
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
