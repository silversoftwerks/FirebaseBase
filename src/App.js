import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import "./App.scss";
import firebase from "./components/Firebase";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Meetings from "./components/Meetings";
import Register from "./components/Register";
import CheckIn from "./components/CheckIn";
import Attendees from "./components/Attendees";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount(userName) {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });

        const meetingsRef = firebase.database().ref("meetings/" + FBUser.uid);

        meetingsRef.on("value", snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate("/meetings");
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userID: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  addMeeting = meetingName => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    ref.push({ meetingName: meetingName });
  };

  render() {
    return (
      <div className="container">
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        {this.state.user && (
          <Welcome user={this.state.displayName} logOutUser={this.logOutUser} />
        )}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings
            path="/meetings"
            meetings={this.state.meetings}
            addMeeting={this.addMeeting}
            userID={this.state.userID}
          />
          <Attendees
            path="/attendees/:userID/:meetingsID"
            adminUser={this.state.userID}
          />
          <CheckIn path="/checkin/:userID/:meetingID" />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;
