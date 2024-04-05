import React, { useState } from 'react';
import axios from 'axios';
import './EditProfil.css';

function EditProfil(props) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(props.name);
  const [mail, setMail] = useState(props.mail);
  const [phone, setPhone] = useState(props.phone);
  const [image, setImage] = useState(props.image);

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

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'mail') {
      setMail(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const yourAccessToken = sessionStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/editprofil', {
        name: name,
        email: mail,
        phone: phone,
        image: image
      }, {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });
      if (response.status === 200) {
        props.onSaveChanges({ name, mail, phone,image });
        handleCloseModal();
      } else {
        alert('update failed');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} type="button" className="editButton">Edit Profile</button>

      {showModal && (
        <div className="modal overlay" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" className="form-control" name="mail" value={mail} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input type="text" className="form-control" name="phone" value={phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Profile picture:</label>
                  <input type="file" accept="image/*" className="form-control" id="pictureInput" onChange={convertToBase64} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-save" onClick={handleSaveChanges}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfil;
