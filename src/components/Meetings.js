import React, { Component } from "react";
import MeetingsList from "./MeetingsList";

class Meetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: ""
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
    this.props.addMeeting(this.state.meetingName);
    this.setState({ meetingName: "" });
  };

  render() {
    return (
      <div>
        <h1>Add A Meeting</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add Meeting"
            value={this.state.meetingName}
            onChange={this.handleChange}
            name="meetingName"
          />
          <button type="submit">+</button>
        </form>
        {this.props.meetings && this.props.meetings.length ? (
          <div>
            <h3>Your Meetings</h3>
          </div>
        ) : null}

        {this.props.meetings && (
          <div>
            <MeetingsList
              userID={this.props.userID}
              meetings={this.props.meetings}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Meetings;
