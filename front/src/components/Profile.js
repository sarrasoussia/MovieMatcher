import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import EditProfil from "./EditProfil";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Navigate } from "react-router-dom";
import axios from "axios";

import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState({
    favorite_movies: [],
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [redirect, setRedirect] = useState(false);

  const fetchUserData = async () => {
    try {
      const yourAccessToken = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/user_info", {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`,
        },
      });
      const { name, email, phone, image, favorite_movies } = response.data[0];
      setUserData({ name, email, phone, image, favorite_movies });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    if (redirect) {
      window.location.reload();
  }
  }, [redirect]);

  const handleSaveChanges = (updatedInfo) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: updatedInfo.name,
      email: updatedInfo.mail,
      phone: updatedInfo.phone,
      image: updatedInfo.image,
    }));
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setRedirect(true);
  };

  const mapping = (x) => {
    return x.map((movie) => (
      <div className="col-4" key={movie.id}>
        <MovieCard
          shortsummary={movie["Short Summary"]}
          title={movie.title}
          rate={movie.rate}
          refreshProfile={fetchUserData}
        />
      </div>
    ));
  };

  const movielist = mapping(userData.favorite_movies);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mainContainerProfil" style={{ background: "linear-gradient(to top, rgb(4, 4, 4), rgba(36, 34,34,0.937))" }}>
      <div className="cover" style={{ backgroundImage: `url(images/coverimg.png)` }}>
        <p className="welcome text-center" style={{ fontFamily: "cinematic"}}>
          <span style={{ color: "rgb(97, 75, 49)" }}> Welcome to your profile </span>
          <span style={{ color: "rgb(195, 58, 58)" }}>{userData.name}</span>
        </p>
      </div>

      <div className="underCover ">
        <div className="profcontainer" style={{ backgroundImage: `url(${userData.image})` }}></div>

        <EditProfil name={userData.name} mail={userData.email} phone={userData.phone} onSaveChanges={handleSaveChanges} />

        <button onClick={logout} type="button" className="btn btn-outline-secondary text-white" style={{ width: "150px", fontWeight:"600" , backgroundColor:"rgba(186, 208, 85, 0.818)" }}>
          Logout<span><BiLogOut style={{ fontSize: "24px", marginLeft: "8px" }} /></span>
        </button>
      </div>

      <div className="dataContainer ">
        <div className="personalinfo ">
          <em style={{ color: "whitesmoke", fontWeight: "800", fontSize: "20px" }}> Personal <em style={{ color: "#ec6090" }}>Info</em></em>
          <p style={{ color: "white", fontSize: "16px", marginTop: "20px" }}><FaRegUser style={{ marginRight: "20px", fontSize: "22px" }} />{userData.name}</p>
          <p style={{ color: "white", fontSize: "16px" }}><MdOutlineMailOutline style={{ marginRight: "20px", fontSize: "22px" }} />{userData.email}</p>
          <p style={{ color: "white", fontSize: "16px" }}><MdOutlinePhone style={{ marginRight: "20px", fontSize: "22px" }} />{userData.phone}</p>
        </div>

        <div className="moviesContainer ">
          <div style={{ marginBottom: "20px", marginTop: "-80px" }}>
            <em style={{ color: "whitesmoke", fontWeight: "800", marginLeft: "34%", fontSize: "30px" }}>Movie feed</em>
          </div>
          <div className="secondcontainer row">
            <em className="col-12 text" style={{ color: "whitesmoke", fontWeight: "800", fontSize: "20px", marginTop: "20px",marginBottom:"20px" }}>Your Favorite <em style={{ color: "#ec6090" }}>Movies</em></em><br></br>
            {movielist}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
