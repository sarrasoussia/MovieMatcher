import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

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
            console.log(reader.result);
            setImage(reader.result);
            console.log(reader.result)
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    const handleCreate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/signup', { image, name, email, phone, password });
            if (response.status === 200) {
                console.log("account created successfully");
                setRedirect(true);
            } else {
                alert("creation failed");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="py-5">
            <div className="container-fluid card py-3" style={{ width: "65%", marginTop: "100px", marginBottom: "80px" }}>
                <h1 className="text-white text-center display-1 py-1" style={{ fontFamily: "cinematic" }}>
                    Créer un <span style={{ color: "red" }}>Compte</span>
                </h1>
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <form>
                            <div className="mb-3">
                                <input type="text" value={name} className="form-control" id="nameInput" placeholder="Nom" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="file" accept="image/*" className="form-control" id="pictureInput" onChange={convertToBase64} />                              
                            </div>
                            <div className="mb-3">
                                <input type="email" value={email} className="form-control " id="emailinput" aria-describedby="emailHelp" placeholder="Adresse email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={phone} className="form-control" id="phoneInput" placeholder="phone" onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="password" value={password} className="form-control " id="passwordinput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="text-center">
                                <button onClick={handleCreate} type="button" className="btn btn-danger w-100 text-white">Créer un compte</button>
                            </div>
                            
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
