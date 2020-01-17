import React, { Component } from "react";
import { Link } from "@reach/router";

class Welcome extends Component {
  render() {
    const { user, logOutUser } = this.props;
    return (
      <div>
        <p>
          Welcome {user}!{" "}
          <Link to="/login" onClick={e => logOutUser(e)}>
            logout
          </Link>
        </p>
      </div>
    );
  }
}

export default Welcome;
