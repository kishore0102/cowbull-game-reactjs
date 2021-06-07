import React, { Component } from "react";
import GuessedWords from "./guessedwords.component";
import GuessInput from "./guessinput.component";
import GuessLeft from "./guessleft.component";
import jsondata from "./input.json";

export default class Game extends Component {
  state = {
    inputErrorMessage: "",
    wordNeedsToBeGuessed: "",
    guessRemaining: 10,
    guessedWords: [],
    clueWord: "",
  };

  componentDidMount = () => {
    let randomNumber = Math.floor(Math.random() * jsondata.length);
    for (let i = 0; i < jsondata.length; i++) {
      if (i === randomNumber) {
        this.setState({ wordNeedsToBeGuessed: jsondata[i] });
      }
    }
  };

  checkForStringInJsonData = (e) => {
    for (let i = 0; i < jsondata.length; i++) {
      if (jsondata[i] === e.toLowerCase()) {
        return true;
      }
    }
    return false;
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
      alert(
        "You have exhaused all your tries. Better luck next time!\nAnswer is " +
          this.state.wordNeedsToBeGuessed
      );
      window.location.replace("/");
    }
  };

  handleGiveUpButton = (e) => {
    if (window.confirm("Are you sure to give up?")) {
      alert("Too bad mate! Answer is " + this.state.wordNeedsToBeGuessed);
      window.location.replace("/");
    }
  };

  handleGiveClueButton = (e) => {
    let word = this.state.wordNeedsToBeGuessed;
    let clueWord = this.state.clueWord;
    if (!clueWord) {
      let randomNumber = Math.floor(Math.random() * 3);
      for (let i = 0; i < 4; i++) {
        if (i === randomNumber) {
          this.setState({ clueWord: word[i] });
        }
      }
    }
  };

  render() {
    let inputerror = "";

    if (this.state.inputErrorMessage !== "") {
      inputerror = <p>{this.state.inputErrorMessage}</p>;
    }

    let clueButton = "";
    let clueSection = "";

    if (!this.state.clueWord) {
      clueButton = (
        <button
          type="button"
          id="guessbutton"
          className="btn btn-info"
          disabled={this.state.clueWord ? "disabled" : ""}
          onClick={this.handleGiveClueButton}
        >
          Give me a clue
        </button>
      );
    }

    if (this.state.clueWord) {
      clueSection = (
        <p>
          <span style={{ color: "black", fontStyle: "italic" }}>
            <b>Hint:</b> The words includes the letter
          </span>
          <span style={{ color: "red", fontStyle: "strong" }}>
            <b>&nbsp;'{this.state.clueWord.toUpperCase()}'&nbsp;</b>
          </span>
        </p>
      );
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
          <br />
          <br />
          <div className="d-flex justify-content-around">
            <button
              type="button"
              id="guessbutton"
              className="btn btn-secondary"
              onClick={this.handleGiveUpButton}
            >
              Give up!
            </button>
            {clueButton}
          </div>
          <br />
          <br />
          {clueSection}
        </div>
      </React.Fragment>
    );
  }
}
