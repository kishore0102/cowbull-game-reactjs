import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Topnav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light py-3">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            Cow & Bull Game
          </Link>
        </div>
      </nav>
    );
  }
}
