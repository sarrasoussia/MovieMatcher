import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        if (redirect) {
            window.location.reload();
        }
    }, [redirect]);

    const handleLogin = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError("Please enter a valid email address");
                return;
            }

            const response = await axios.post('http://localhost:5000/login', { email, password });
            if (response.status === 200 && response.data.access_token) {
                console.log("this came from the backend", response.data);
                sessionStorage.setItem("token", response.data.access_token);
                setRedirect(true);
            } else {
                alert("Bad username or password");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Error:', error);
                alert("ce copmte n'existe pas");
            }else {
                console.error('Error:', error);
            }
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
            <div className="py-5" style={{background: "linear-gradient(to top, rgba(255,255,255,0), rgba(0, 0, 0, 0.2))"}}>
                <p className="text-white text-center display-1 py-2" style={{ fontFamily: "cinematic",fontSize:"65px", transform:"translate(0px,45px)",marginBottom:"40px"}}> Welcome <span style={{ color: "rgba(186, 208, 85, 0.818)" }}>Back</span></p>

                <div className="row" style={{  paddingTop: "60px",paddingBottom: "120px", borderBottom: "2.5px solid black", width: "100%" ,transform:"translate(14px,0px)"}}>
                    <img className="col-3" src="/images/login1.png" alt="" style={{marginLeft:"40px",transform:"translate(150px,-75px)"}}/>
                    <p className="text-white text-center py-5 col-6" style={{marginLeft:"140px"}}>
                        <form>
                            <div className="mb-3">
                                <input type="email" value={email} className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                                {emailError && <div className="text-danger">{emailError}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="password" value={password} className="form-control " id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
    
                            <div className="text-center">
                                <button onClick={handleLogin} type="button" className="btn btn-outline-secondary w-100 text-white bouuton">Log in</button>
                            </div>
                            <p className="text-white" style={{ transform: "translate(0,4px)" }}> Don't have an account ?</p>
                            <div className="text-center">
                                <button type="submit" className="btn btn-outline-secondary w-100 text-white bouuton"><Link className="text-white" style={{ textDecoration: "none" }} to="/signup">Create account</Link></button>
                            </div>
                            <br />
                        </form>                   
                    </p>
                </div>
            </div>

    );
}

export default Login;
