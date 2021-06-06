import React, { Component } from "react";

export default class GuessInput extends Component {
  state = {
    guessButtonDisabled: true,
  };

  handleInput1 = (e) => {
    this.letter1 = e.target.value;
    this.handleInputChange();
    document.getElementById("letter2").focus();
  };

  handleInput2 = (e) => {
    this.letter2 = e.target.value;
    this.handleInputChange();
    document.getElementById("letter3").focus();
  };

  handleInput3 = (e) => {
    this.letter3 = e.target.value;
    this.handleInputChange();
    document.getElementById("letter4").focus();
  };

  handleInput4 = (e) => {
    this.letter4 = e.target.value;
    this.handleInputChange();
  };

  handleInputChange = (e) => {
    if (this.letter1 && this.letter2 && this.letter3 && this.letter4) {
      let word = this.letter1 + this.letter2 + this.letter3 + this.letter4;
      if (
        this.handleCheckForDuplicates(word) &&
        this.props.checkForStringInJsonData(word)
      ) {
        this.props.handleInputErrorMessage("");
        this.setState({ guessButtonDisabled: false });
        document.getElementById("guessbutton").focus();
      }
    } else {
      this.setState({ guessButtonDisabled: true });
    }
  };

  handleCheckForDuplicates = (e) => {
    let map = new Map();
    for (let i = 0; i < 4; i++) {
      if (map.has(e[i])) {
        this.props.handleInputErrorMessage(
          "guesses cannot have repeating letters!"
        );
        return false;
      }
      map.set(e[i], 1);
    }
    return true;
  };

  handleGuessButton = (e) => {
    e.preventDefault();
    let word = this.letter1 + this.letter2 + this.letter3 + this.letter4;
    this.props.handleAddGuessedWords(word);
    document.getElementById("guess-input-form").reset();
  };

  render() {
    return (
      <React.Fragment>
        <form className="flex1" id="guess-input-form">
          <input
            className="letter1"
            id="letter1"
            type="text"
            size="1"
            maxLength="1"
            required
            onChange={this.handleInput1}
          />
          <input
            className="letter2"
            id="letter2"
            type="text"
            size="1"
            maxLength="1"
            required
            onChange={this.handleInput2}
          />
          <input
            className="letter3"
            id="letter3"
            type="text"
            size="1"
            maxLength="1"
            required
            onChange={this.handleInput3}
          />
          <input
            className="letter4"
            id="letter4"
            type="text"
            size="1"
            maxLength="1"
            required
            onChange={this.handleInput4}
          />
          <button
            type="button"
            id="guessbutton"
            className="btn btn-warning"
            disabled={this.state.guessButtonDisabled ? "disabled" : ""}
            onClick={this.handleGuessButton}
          >
            Guess
          </button>
        </form>
      </React.Fragment>
    );
  }
}
