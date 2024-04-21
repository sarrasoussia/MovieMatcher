import React from "react";
import { useLocation } from "react-router-dom";
import './Footer.css';

function Footer() {
    const location = useLocation();
    function color() {
        if (location.pathname === "/") {
            return "red";
        } else if (location.pathname === "/about") {
            return "#ec6090";
        } else if (location.pathname === "/contact") {
            return "rgba(116, 229, 244, 0.714)";
        }else if (location.pathname === "/login") {
            return "rgba(186, 208, 85, 0.818)";
        }else if (location.pathname === "/signup") {
            return "rgba(186, 208, 85, 0.818)";
        }
        return "red";
    }
    
    return (
        <div className="container-fluid style">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className=" text-center" >
                            <h1 style={{ fontFamily: "cinematic", fontSize: "55px", transform: "translate(-180px,40px)" }} className="text-white">Match your Mood & <span style={{ color: color() }}>Chill !</span></h1>
                        </div>
                        <div className="text-center" style={{ transform: "translate(0px,10px)" }}>
                            <h3 style={{ fontFamily: "cinematic", fontSize: "50px", transform: "translate(-180px,0px)" }} className="text-white py-3"><span style={{ color: color() }}>Social</span> Media :</h3>
                            <div className="row mx-auto" style={{ marginTop: "10px" }}>
                                <div className="col-md-3">
                                    <a href="https://www.linkedin.com/in/mouhanned-jawadi-etudiant-genie-informatique/">
                                        <img
                                            src="/images/linkedin.png"
                                            width="50rem"
                                            alt=""
                                        />
                                    </a>

                                </div>
                                <div className="col-md-3 ">
                                    <a href="https://www.instagram.com/mouhanned_jaouedi/?hl=fr">
                                        <img
                                            src="/images/instagram.png"
                                            width="50rem"
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <div className="col-md-3 ">
                                    <a href="https://www.facebook.com/profile.php?id=100083750044161">
                                        <img
                                            src="/images/facebook.png"
                                            width="50rem"
                                            alt=""
                                        />
                                    </a>

                                </div>
                                <div className="col-md-3 ">
                                    <a href="https://www.youtube.com/watch?v=XXYlFuWEuKI&list=RD02xmR4rS3UE&index=9">
                                        <img
                                            src="/images/youtube.png"
                                            width="50rem"
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
                            <br />
                            <p className="  text-white text-center py-3">&copy; 2024 All Rights Reserved. </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row mx-auto">

                            <img
                                src="/images/logo.png"
                                width="67%"
                                alt=""
                                style={{ marginLeft: "24%" }}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default Footer;
