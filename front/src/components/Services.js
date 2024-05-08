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

                    <div className="col-3" style={{marginLeft:"50px"}}>
                        <Service
                            title="Category CineScope"
                            description="This Service will provide you only movies due to categeory selection , no need for authentification."
                            path="/moviegenerator"
                        />
                    </div>

                    <img className="col-5" src="images/mmmmmmmm.png" alt="" style={{width:"20px",height:"280px",marginTop:"70px"}}/>

                    <div className="col-3">
                        <Service
                        title="Moodflix Match"
                            description="This Service will analyze your mood and suggest you some movies to chill , authentification needed."
                            path={this.path()}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default Services;
