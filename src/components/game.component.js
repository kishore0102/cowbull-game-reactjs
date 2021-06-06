import React, { Component } from "react";
import GuessedWords from "./guessedwords.component";
import GuessInput from "./guessinput.component";
import GuessLeft from "./guessleft.component";
import jsondata from "./input.json";

export default class Game extends Component {
  state = {
    dataMap: {},
    inputErrorMessage: "",
    wordNeedsToBeGuessed: "",
    guessRemaining: 10,
    guessedWords: [],
  };

  componentDidMount = (e) => {
    let dataMap = new Map();
    let randomNumber = Math.floor(Math.random() * jsondata.length);
    for (let i = 0; i < jsondata.length; i++) {
      if (i === randomNumber) {
        this.setState({ wordNeedsToBeGuessed: jsondata[i] });
      }
      dataMap.set(jsondata[i], "1");
    }
    this.setState({ dataMap });
  };

  checkForStringInJsonData = (e) => {
    console.log("checking for -> " + e);
    if (this.state.dataMap.has(e)) {
      return true;
    } else {
      this.handleInputErrorMessage("Not a valid word!");
      return false;
    }
  };

  handleInputErrorMessage = (e) => {
    this.setState({ inputErrorMessage: e });
  };

  handleAddGuessedWords = (e) => {
    let guessedWords = this.state.guessedWords;
    guessedWords.push(e);
    this.setState({ guessedWords });
    let guessRemaining = this.state.guessRemaining - 1;
    this.setState({ guessRemaining });

    if (e === this.state.wordNeedsToBeGuessed) {
      alert("Congratulations! You have guessed the word.");
      window.location.replace("/");
    }

    if (this.state.guessRemaining === 1) {
      alert("You have exhaused all your tries. Better luck next time!");
      window.location.replace("/");
    }
  };

  render() {
    let inputerror = "";

    if (this.state.inputErrorMessage !== "") {
      inputerror = <p>{this.state.inputErrorMessage}</p>;
    }

    return (
      <React.Fragment>
        <br />
        <div className="gamecontainer">
          <div className="flex1">
            <GuessInput
              handleAddGuessedWords={this.handleAddGuessedWords}
              handleInputErrorMessage={this.handleInputErrorMessage}
              checkForStringInJsonData={this.checkForStringInJsonData}
            />
          </div>
          <span style={{ padding: "10px" }}>
            <div
              style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}
            >
              {inputerror}
            </div>
          </span>
          <p className="guessleft">Guesses left: </p>
          <div className="flex1">
            <GuessLeft guessRemaining={this.state.guessRemaining} />
          </div>
          <br />
          <div className="flex2">
            <GuessedWords
              guessedWords={this.state.guessedWords}
              wordNeedsToBeGuessed={this.state.wordNeedsToBeGuessed}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
