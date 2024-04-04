import React, { Component } from "react";
import MovieCard from "./MovieCard";
import movies from "./fakemovies";
import EditProfil from "./EditProfil";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Navigate} from "react-router-dom";
import axios from "axios";

import "./Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      movies,
      name: "",
      email: "",
      phone: "",
      image:"",
      redirect:false
    };
    this.mapping = this.mapping.bind(this);
  }

  async componentDidMount() {
    try {
      const yourAccessToken = sessionStorage.getItem("token");
      // console.log(yourAccessToken)
      const response = await axios.get("http://localhost:5000/user_info", {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });
      console.log(response.data)
      const { name, email, phone,image } = response.data[0];
      this.setState({ name, email, phone,image });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  
  

  handleSaveChanges = (updatedInfo) => {
    this.setState({
      name: updatedInfo.name,
      email: updatedInfo.mail,
      phone: updatedInfo.phone,
      image: updatedInfo.image
    });
  };
  logout = () => {
    sessionStorage.removeItem("token");
    this.setState({ redirect: true });
}

  mapping(x) {
    const movies = x.map((movie) => (
      <div className="col-4" key={movie.id}>
        <MovieCard
          img={movie.img}
          title={movie.title}
          rate={movie.rate}
          genre={movie.genre}
        />
      </div>
    ));
    return movies;
  }

  render() {
    const movielist = this.mapping(this.state.movies);
    if (this.state.redirect) {
      return <Navigate to="/login" />;
  }
    return (
      <div
        style={{ background: "linear-gradient(to top, rgb(4, 4, 4), rgba(36, 34, 34, 0.937))" }}
        className="container-fluid py-5 position-relative"
      >
        <img alt="" className="coverimg" src="images/coverimg.png" />
        <div className="profile-text">
          <p className="text-white text-center display-1 py-3" style={{ fontFamily: "cinematic", fontSize: "400%" }}>
            <span style={{ color: "rgb(97, 75, 49)" }}> Welcome to your profile</span>{" "}
            <span style={{ color: "rgb(195, 58, 58)" }}>{this.state.name}</span>
          </p>
        </div>

        <div className="profcontainer">
          <img alt="" className="profilpic" height={135} width={135} src={this.state.image} ></img>
        </div>
        <EditProfil
          name={this.state.name}
          mail={this.state.email}
          phone={this.state.phone}
          onSaveChanges={this.handleSaveChanges}
        />
        <button onClick={this.logout} type="button" className="btn btn-outline-secondary" style={{ width: '40%', marginLeft: '28%', marginTop: '20px' }}>Logout<span><BiLogOut style={{fontSize: "24px",marginLeft:"8px"}} /></span></button>
        <div className="personalinfo">
          <em style={{ color: "whitesmoke", fontWeight: "800", fontSize: "20px" }}> Personal <em style={{ color: "#ec6090" }}>Info</em></em>
          <p style={{ color: "white", marginLeft: "10px", marginTop: "20px", fontSize: "16px" }}><FaRegUser style={{ marginRight: "20px", fontSize: "22px" }} />{this.state.name}</p>
          <p style={{ color: "white", marginLeft: "10px", marginTop: "20px", fontSize: "16px" }}><MdOutlineMailOutline style={{ marginRight: "20px", fontSize: "22px" }} />{this.state.email}</p>
          <p style={{ color: "white", marginLeft: "10px", marginTop: "20px", fontSize: "16px" }}><MdOutlinePhone style={{ marginRight: "20px", fontSize: "22px" }} />{this.state.phone} </p>

        </div>



        <div className="moviescontainer">
          <div style={{ marginBottom: "15px" }}>
            <em style={{ color: "whitesmoke", fontWeight: "900", marginLeft: "34%", fontSize: "20px" }} >Movie feed</em>
          </div>
          <div className="secondcontainer row">
            <em className="col-12 text" style={{ color: "whitesmoke", fontWeight: "800", fontSize: "20px", marginTop: "20px" }} >Your Favorite <em style={{ color: "#ec6090" }}>Movies</em></em><br></br>
            {movielist}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;