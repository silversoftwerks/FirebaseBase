import React, { Component } from "react";
import { Link } from "@reach/router";

class Navigation extends Component {
  render() {
    const { user, logOutUser } = this.props;
    return (
      <nav className="navigation">
        {user && (
          <ul>
            <li>
              <Link to="/meetings">Meetings</Link>
            </li>
            <li>
              <Link to="/login" onClick={e => logOutUser(e)}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!user && (
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login"> Login</Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default Navigation;
