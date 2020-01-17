import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Meeting Log</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          pulvinar, mauris sit amet interdum feugiat, nibh eros elementum
          turpis, ut lobortis lorem neque nec dui. Fusce convallis ipsum vitae
          nunc sodales pharetra. Aliquam ac ipsum quam. Phasellus imperdiet,
          purus facilisis egestas porta, libero augue sagittis magna, in feugiat
          felis nibh sit amet leo. Sed malesuada scelerisque adipiscing. Nulla
          semper erat eu dui posuere vestibulum. Fusce egestas felis mauris.
          Donec rhoncus, turpis eu blandit mollis, mi erat semper turpis, vel
          commodo tortor mised nulla. Quisque euismod blandit ante eget posue.
        </p>
        {user == null && (
          <div>
            <Link className="button" to="/register">
              Register
            </Link>
            <Link className="button" to="/login">
              Log In
            </Link>
          </div>
        )}
        {user !== null && (
          <div>
            <Link className="button" to="/meetings">
              Meetings
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
