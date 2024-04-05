import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [emailError, setEmailError] = useState("");

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
        <div className="py-5">
            <div className="container-fluid card py-3" style={{ width: "65%", marginTop: "100px", marginBottom: "80px" }}>
                <h1 className="text-white text-center display-1 py-1" style={{ fontFamily: "cinematic" }}> Welcome <span style={{ color: "red" }}> Back</span> </h1>
                <div className="row">
                    <div className="col-md-9 mx-auto">
                        <form>
                            <div className="mb-3">
                                <input type="email" value={email} className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                                {emailError && <div className="text-danger">{emailError}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="password" value={password} className="form-control " id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="text-center">
                                <button onClick={handleLogin} type="button" className="btn btn-danger w-100 text-white">Log in</button>
                            </div>
                            <p className="text-white" style={{ transform: "translate(0,4px)" }}> Don't have an account ?</p>
                            <div className="text-center">
                                <button type="submit" className="btn btn-danger w-100 text-dark"><Link className="text-white" style={{ textDecoration: "none" }} to="/signup">Create account</Link></button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
