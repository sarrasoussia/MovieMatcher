import { Component } from "react";
import Service from './Service'

class Services extends Component {
    path(){
        const access_token = sessionStorage.getItem("token");
        if (access_token && access_token !== "") {
            return "/features";           
        }else{
            return "/login";
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col md-6">
                        <div className="row">
                            <div className="col">
                                <Service
                                    title="Category CineScope"
                                    description="This Service will provide you only movies due to categeory selection , no need for authentification."
                                    path="/moviegenerator"
                                />
                            </div>
                            <div className="col">
                                <Service
                                title="Moodflix Match"
                                    description="This Service will analyze your mood and suggest you some movies to chill , authentification needed."
                                    path={this.path()}
                                />
                            </div>
                        </div>
                    </div>
                    <img className="col-6" src="images/mmmmmmmm.png" alt="" style={{width:"20px",height:"280px",marginTop:"70px"}}/>
                    {/* <h1 className=" text-white text-center display-1 py-3 col-6" style={{fontFamily: "cinematic"}}> Our <span style={{color:"red"}}> Services</span></h1> */}

                </div>
            </div>
        );
    }
}

export default Services;
