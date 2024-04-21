import React from "react";
import { Link,useLocation } from "react-router-dom";
import './EnterHeader.css';

function EnterHeader() {
    const location = useLocation();
    function matchercolor() {
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
        <nav className='navbar navbar-expand-lg header'>
            <div className="container-fluid">
                <Link className="navbar-brand text-white" to="/">Movie <span style={{ color: matchercolor()  }}>Matcher</span></Link>
                <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse items" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                    <div>
                        <button type="button" className="btn btn-outline-secondary me-2 buttons"><Link className="text-white" style={{ textDecoration: "none" }} to="/login">Sign In</Link></button>
                        <button type="button" className="btn btn-outline-secondary buttons"><Link className="text-white" style={{ textDecoration: "none" }} to="/signup">Sign Up</Link></button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default EnterHeader;
