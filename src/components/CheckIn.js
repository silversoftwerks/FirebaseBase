import React, { Component } from "react";
import firebase from "./Firebase";
import { navigate } from "@reach/router";

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: ""
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
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);
    ref.push({
      attendeeName: this.state.displayName,
      attendeeEmail: this.state.email
    });
    navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`);
  };

  render() {
    return (
      <div>
        <h2>Check In</h2>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">Check In</button>
        </form>
      </div>
    );
  }
}

export default CheckIn;
