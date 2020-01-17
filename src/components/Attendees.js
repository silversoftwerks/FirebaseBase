import React from "react";
import firebase from "./Firebase";

export default class Attendees extends React.Component {
  constructor(props) {
    super();
    this.state = {
      displayAttendees: []
    };
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

    ref.on("value", snapshot => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail
        });
      }
      this.setState({
        displayAttendees: attendeesList
      });
    });
  }
  render() {
    return (
      <div>
        <h1>Attendees</h1>
      </div>
    );
  }
}
