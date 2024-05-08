import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import './Header.css';

function Header() {
    const [image, setImage] = useState("");
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const yourAccessToken = sessionStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/user_info", {
                    headers: {
                        Authorization: `Bearer ${yourAccessToken}`,
                    },
                });
                const { image } = response.data[0];
                setImage(image);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchData();
    }, []);

    function matchercolor() {
        if (location.pathname === "/") {
            return "red";
        } else if (location.pathname === "/about") {
            return "#ec6090";
        } else if (location.pathname === "/contact") {
            return "rgba(116, 229, 244, 0.714)";
        }
        return "red";
    }

    return (
        <nav className='navbar navbar-expand-lg header'>
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to="/">Movie <span style={{ color: matchercolor() }}>Matcher</span></Link>
                <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse itemstyle" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/moviegenerator">Featured Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/contact">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/webcam">Webcam</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/features">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/profile">
                                <img
                                    src={image}
                                    alt=""
                                    style={{ width: "27px", height: "27px", borderRadius: "30px" }}
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
