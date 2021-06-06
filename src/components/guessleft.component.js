import React, { Component } from "react";

export default class GuessLeft extends Component {
  render() {
    let countview = [];

    for (let i = 0; i < this.props.guessRemaining; i++) {
      countview.push(
        <svg
          key={"svg1" + i}
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            stroke="black"
            strokeWidth="2"
            fill="black"
          />
        </svg>
      );
    }

    for (let i = 0; i < 10 - this.props.guessRemaining; i++) {
      countview.push(
        <svg
          key={"svg0" + i}
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    }

    return (
      <React.Fragment>
        {/* <p className="guessleft">Guesses left: </p> */}
        <br />
        {countview}
      </React.Fragment>
    );
  }
}
