import { Component } from "react";
import './Developer.css'

class Developer extends Component{
    render(){
        return(
            <div className="card elementss" >
                <div className="card-body">
                    <img className='image' alt="" src={this.props.image} />
                    <div style={{transform:"translate(0px,6px)"}}>
                    <p><span style={{color:"#abece9" , fontWeight:"400"}} >Name: </span><span style={{color:"white" , fontWeight:"400"}}>{this.props.name}</span><br></br></p>
                    <a href="https://www.linkedin.com/in/ala-ghoul-bhiri-00b11a260/" style={{color:"#abece9" , fontWeight:"400",transform:"translate(0px,-10px)"}}>
                    <span style={{color:"#abece9" , fontWeight:"400"}} >linkedin: </span>
                        <span style={{color:"white" , fontWeight:"400"}}>
                          {this.props.name} 
                        </span>
                    </a>
                    </div>
                </div>
            </div>

          
        );
    }
}

export default Developer;