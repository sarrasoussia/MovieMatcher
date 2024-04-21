import React, { Component } from "react";

class Slider extends Component {
  render() {
    return (
      <div style={{ border: "5px solid white", borderRadius: "20px", padding: "10px", backdropFilter: "blur(15px)",
      backgroundColor: "rgba(255,255,255,0.2)" ,marginRight:"50px",marginLeft:"50px"}}>
        <div style={{ backgroundColor: "black", borderRadius: "20px" }}>
          <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
            <div className="carousel-item active" style={{ backgroundImage: "url('images/poster1.jpg')", backgroundSize: "cover", height: "30rem" }}>
              {/* <div style={{backgroundColor:"rgba(0, 0, 0, 0.6)",width:"18%",marginLeft:"40%",marginTop:"5px",borderRadius:"20px",height:"15%"}}>
               <h1 className=" text-white text-center display-1 py-3" style={{fontFamily: "cinematic",fontSize:"47px",marginTop:"-18px"}}> Our <span style={{color:"red"}}> Features !</span> </h1>
              </div> */}

            </div>

            <div className="carousel-item" style={{ backgroundImage: "url('images/poster2.jpg')", backgroundSize: "cover", height: "30em" }}>
            <div style={{backgroundColor:"rgba(0, 0, 0, 0.6)",width:"18%",marginLeft:"40%",marginTop:"5px",borderRadius:"20px",height:"15%"}}>
               <h1 className=" text-white text-center display-1 py-3" style={{fontFamily: "cinematic",fontSize:"47px",marginTop:"-18px"}}> Our <span style={{color:"red"}}> Features !</span> </h1>
              </div>
            </div>

            <div className="carousel-item" style={{ backgroundImage: "url('images/poster3.jpg')", backgroundSize: "cover", height: "30rem" }}>
            <div style={{backgroundColor:"rgba(0, 0, 0, 0.6)",width:"18%",marginLeft:"40%",marginTop:"5px",borderRadius:"20px",height:"15%"}}>
               <h1 className=" text-white text-center display-1 py-3" style={{fontFamily: "cinematic",fontSize:"47px",marginTop:"-18px"}}> Our <span style={{color:"red"}}> Features !</span> </h1>
              </div>
            </div>

            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-target="#carouselExampleFade"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-target="#carouselExampleFade"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;

