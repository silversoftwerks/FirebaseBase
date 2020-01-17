import React, { Component } from "react";
import firebase from "./Firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      passOne: "",
      passTwo: "",
      errorMessage: null
    };
  }

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState(
      {
        [itemName]: itemValue
      },
      () => {
        if (this.state.passOne !== this.state.passTwo) {
          this.setState({ errorMessage: "Passwords do not match" });
        } else {
          this.setState({ errorMessage: null });
        }
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    let registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passOne
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.registerUser(registrationInfo.displayName);
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit} className="registrationForm">
          {this.state.errorMessage}
          <input
            type="text"
            name="displayName"
            placeholder="Display Name"
            value={this.state.displayName}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="passOne"
            placeholder="Password"
            value={this.state.passOne}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="passTwo"
            placeholder="Repeat Password"
            value={this.state.passTwo}
            onChange={this.handleChange}
          />
          <button type="submit" className="submitRegistration">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
