import { Component } from "react";
import { Link } from "react-router-dom";
import "./Service.css"


class Service extends Component{
    render(){
        return(
            <div className="card">
                <div className="card-header" >
                <img 
                src="images/serviceimg.png"
                style={{width:"120%",height:"100%",transform:"translate(-34px,0px)"}}
                alt=""
                />
                </div>
                <div className="card-body row" style={{height:"100%"}}>
                    <h5 className="card-title text-white">{this.props.title}</h5>
                    <p className="card-text text-white">{this.props.description}</p>
                    <Link style={{marginBottom:"10px",borderRadius:"10px",marginRight:"6px",textAlign:"center"}} className="nav-link text-white btn-danger" to={this.props.path}>Try Service</Link>

                </div>
            </div>
        );
    }
}

export default Service;