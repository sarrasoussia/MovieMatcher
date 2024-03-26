import React, { Component } from 'react';

class EditProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: props.name,
      mail: props.mail,
      phone: props.phone
    };
  }

  handleButtonClick = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSaveChanges = () => {
    this.props.onSaveChanges(this.state);
    this.handleCloseModal();
  };

  render() {
    const { showModal, name, mail, phone } = this.state;

    return (
      <div>
        <button onClick={this.handleButtonClick} type="button" className="btn btn-outline-secondary" style={{ width: "60%", marginLeft: "20%", marginTop: "20px" }}>Edit Profile</button>

        {showModal && (
          <div className="modal overlay" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content" >
                <div className="modal-header">
                  <h5 className="modal-title">Edit Profile</h5>
                  <button type="button" className="btn-close" onClick={this.handleCloseModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="mail" value={mail} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" className="form-control" name="phone" value={phone} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={this.handleSaveChanges}>
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
}

export default EditProfil;
