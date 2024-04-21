import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import About from './About';
import Contact from './Contact'
import Profile from './Profile'
import Nomatch from "./Nomatch";
import Login from "./Login";
import Signup from "./Signup";
import WebcamPage from "./WebcamPage";
import Features from "./Features";
import MovieGenerator from "./MovieGenerator";
import Home from "./home";
import EnterHeader from "./EnterHeader";
const App = () => {
  return (
    <Router>
      <div>
        <HeaderWrapper/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/webcam" element={<WebcamPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="*" element={<Nomatch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/moviegenerator" element={<MovieGenerator />} />
        </Routes>
        <FooterWrapper />
      </div>
    </Router>
  );
};

const HeaderWrapper = () => {
  const access_token = sessionStorage.getItem("token");
  if (access_token && access_token !== "") {
    return <Header />;
  } else {
    return <EnterHeader />;
  }
}

const FooterWrapper = () => {
  const location = useLocation();
  if (location.pathname !== "/profile") {
    return <Footer />;
  } else {
    return <div  style={{ background: "linear-gradient(to top, rgba(23, 23, 23, 0.937),rgb(4, 4, 4))" }}>
      <Footer />
    </div>;
  }
};

export default App;
