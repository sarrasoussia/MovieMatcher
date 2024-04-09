import { Component } from "react";
import { Link } from "react-router-dom";
import "./Service.css"


class Service extends Component{
    render(){
        return(
            <div className=" card-style">
                <img 
                src={this.props.img}
                className="card-img-top" 
                alt="specific card info"
                />
                <div className="card-body row" style={{height:"100%"}}>
                    <h5 className="card-title text-white">{this.props.title}</h5>
                    <p className="card-text text-white">{this.props.description}</p>
                    <Link className="nav-link text-white btn-danger" to={this.props.path}>Try Service</Link>

                </div>
            </div>
        );
    }
}

export default Service;