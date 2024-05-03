import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';
function Signup() {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    function convertToBase64(e) {
    
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    const handleCreate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/signup', { image, name, email, phone, password });
            if (response.status === 200) {
                alert("account created successfully");
                console.log("account created successfully");
                setRedirect(true);
            } else {
                alert("creation failed");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Error:', error);
                alert("Tous les champs sont requis.");
            }if (error.response && error.response.status === 401) {
                console.error('Error:', error);
                alert("Format d'email invalide");
            }else if(error.response && error.response.status === 402){
                console.error('Error:', error);
                alert("Email déjà utilisé par un autre utilisateur");
            }else if(error.response && error.response.status === 403){
                console.error('Error:', error);
                alert("Le numéro de téléphone doit contenir uniquement des chiffres");
            }else if(error.response && error.response.status === 404){
                console.error('Error:', error);
                alert("Mot de passe déjà utilisé par un autre utilisateur");
            }else {
                console.error('Error:', error);
            }
        }
    }
    
    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="py-5" style={{background: "linear-gradient(to top, rgba(255,255,255,0), rgba(0, 0, 0, 0.2))"}}>
            <p className="text-white text-center display-1 py-2" style={{ fontFamily: "cinematic",fontSize:"65px", transform:"translate(0px,45px)",marginBottom:"40px"}}> Create Your <span style={{ color: "rgba(186, 208, 85, 0.818)" }}>Account</span></p>
    
            <div className="row" style={{  paddingTop: "60px",paddingBottom: "120px", borderBottom: "2.5px solid black", width: "100%" ,transform:"translate(14px,0px)"}}>
                <img className="col-3" src="/images/login1.png" alt="" style={{marginLeft:"40px",transform:"translate(150px,-75px)"}}/>
                <p className="text-white text-center py-5 col-6" style={{marginLeft:"140px"}}>
                    <form>
                        <div className="mb-3">
                            <input type="text" value={name} className="form-control" id="nameInput" placeholder="Nom" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="file" accept="image/*" className="form-control" id="pictureInput" onChange={convertToBase64} required />                              
                        </div>
                        <div className="mb-3">
                            <input type="email" value={email} className="form-control " id="emailinput" aria-describedby="emailHelp" placeholder="Adresse email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={phone} className="form-control" id="phoneInput" placeholder="phone" onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" value={password} className="form-control " id="passwordinput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="text-center">
                            <button onClick={handleCreate} type="button" className="btn  btn-outline-secondary w-100 text-white bouuton">Create</button>
                        </div>
                        
                        <br />
                    </form>                   
                </p>
            </div>
        </div>
    );
    
}

export default Signup;
