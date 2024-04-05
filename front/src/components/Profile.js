import React, { Component } from "react";
import MovieCard from "./MovieCard";
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
      favorite_movies: [],
      name: "",
      email: "",
      phone: "",
      image:"",
      redirect:false
    };
    this.mapping = this.mapping.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this)
  }

  async componentDidMount() {
    try {
      await this.fetchUserData();
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  
  // Fonction pour récupérer les données utilisateur
  async fetchUserData() {
    const yourAccessToken = sessionStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/user_info", {
      headers: {
        Authorization: `Bearer ${yourAccessToken}`
      }
    });
    const { name, email, phone, image, favorite_movies } = response.data[0];
    this.setState({ name, email, phone, image, favorite_movies });
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
          shortsummary={movie['Short Summary']}
          title={movie.title}
          rate={movie.rate}
          refreshProfile={this.fetchUserData}
        />

      </div>
    ));
    return movies;
  }

  render() {
    const movielist = this.mapping(this.state.favorite_movies);
    if (this.state.redirect) {
      return <Navigate to="/login" />;
  }
    return (
  <div className="mainContainer">

      <div className="cover" style={{backgroundImage: `url(images/coverimg.png)`}}>
        <p className="welcome text-center" style={{ fontFamily: "cinematic"}}>
          <span style={{ color: "rgb(97, 75, 49)" }}> Welcome to your profile </span>
          <span style={{ color: "rgb(195, 58, 58)" }}>{this.state.name}</span>
        </p>
      </div>


      <div className="underCover ">
            <div className="profcontainer" style={{backgroundImage: `url(${this.state.image})`}}>
            </div>

            <EditProfil
              name={this.state.name}
              mail={this.state.email}
              phone={this.state.phone}
              onSaveChanges={this.handleSaveChanges}
              className='editButton '
            />

            <button onClick={this.logout} type="button" className="logoutButton ">Logout<span> <BiLogOut /></span></button>
      </div>     

      <div className="dataContainer ">

            <div className="personalinfo ">
              <em style={{ color: "whitesmoke", fontWeight: "800", fontSize: "20px" }}> Personal <em style={{ color: "#ec6090" }}>Info</em></em>
              <p style={{ color: "white", fontSize: "16px", marginTop: "20px" }}><FaRegUser style={{marginRight: "20px", fontSize: "22px" }} />{this.state.name}</p>
              <p style={{ color: "white", fontSize: "16px" }}><MdOutlineMailOutline style={{ marginRight: "20px", fontSize: "22px" }} />{this.state.email}</p>
              <p style={{ color: "white", fontSize: "16px" }}><MdOutlinePhone style={{ marginRight: "20px", fontSize: "22px" }} />{this.state.phone} </p>

            </div>

            <div className="moviesContainer ">
              <div style={{ marginBottom: "20px", marginTop: "-80px" }}>
                <em style={{ color: "whitesmoke", fontWeight: "900", marginLeft: "34%", fontSize: "30px" }} >Movie feed</em>
              </div>
              <div className="secondcontainer row">
                <em className="col-12 text" style={{ color: "whitesmoke", fontWeight: "800", fontSize: "20px", marginTop: "20px" }} >Your Favorite <em style={{ color: "#ec6090" }}>Movies</em></em><br></br>
                {movielist}
              </div>
            </div>

      </div>

</div>

    );
  }
}

export default Profile;
