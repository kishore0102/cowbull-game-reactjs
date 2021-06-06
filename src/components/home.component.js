import React, { Component } from "react";

export default class Home extends Component {
  handleGoToGame = (e) => {
    e.preventDefault();
    window.location.replace("/game");
  };

  render() {
    return (
      <React.Fragment>
        <div className="gamecontainer">
          <button onClick={this.handleGoToGame}>Play Game</button>
        </div>
      </React.Fragment>
    );
  }
}
