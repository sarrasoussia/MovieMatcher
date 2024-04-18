import React, { Component } from "react";

class Slider extends Component {
  render() {
    return (
      <div style={{ border: "5px solid white", borderRadius: "20px", padding: "10px", backdropFilter: "blur(15px)",
      backgroundColor: "rgba(255,255,255,0.2)" ,marginRight:"50px",marginLeft:"50px"}}>
        <div style={{ backgroundColor: "black", borderRadius: "20px" }}>
          <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="images/poster1.jpg"
                  className="d-block w-100"
                  alt="Slide 1"
                  style={{ height: "30rem" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="images/poster2.jpg"
                  className="d-block w-100"
                  alt="Slide 2"
                  style={{ height: "30em" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="images/poster3.jpg"
                  className="d-block w-100"
                  alt="Slide 3"
                  style={{ height: "30rem" }}
                />
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

