import React, { Component } from "react";
import firebase from "./Firebase";
import { navigate } from "@reach/router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({
      [itemName]: itemValue
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        navigate("/meetings");
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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="registrationForm">
          {this.state.errorMessage}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="submitRegistration">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
