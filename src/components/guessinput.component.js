import React, { Component } from "react";

export default class GuessInput extends Component {
  state = {
    guessButtonDisabled: true,
  };

  componentDidMount = (e) => {
    this.letter1 = "";
    this.letter2 = "";
    this.letter3 = "";
    this.letter4 = "";
    document.getElementById("letter1").focus();
  };

  displayLetters = () => {
    console.log(
      "letters = " +
        this.letter1 +
        " " +
        this.letter2 +
        " " +
        this.letter3 +
        " " +
        this.letter4
    );
  };

  checkForAlphabets = (e) => {
    if (
      (e.keyCode > 64 && e.keyCode < 91) ||
      (e.keyCode > 96 && e.keyCode < 123)
    )
      return true;
    else return false;
  };

  handleKeyUp1 = (e) => {
    console.log("alphabets check = ", this.checkForAlphabets(e));
    if (this.checkForAlphabets(e)) {
      this.handleInput1(e);
    } else {
      document.getElementById("letter1").value = "";
    }
  };

  handleKeyUp2 = (e) => {
    if (this.checkForAlphabets(e)) {
      let letter2backup = this.letter2;
      this.handleInput2(e);
      if (e.keyCode === 8 && letter2backup.length === 0) {
        document.getElementById("letter1").focus();
      }
    } else {
      document.getElementById("letter2").value = "";
    }
  };

  handleKeyUp3 = (e) => {
    if (this.checkForAlphabets(e)) {
      let letter3backup = this.letter3;
      this.handleInput3(e);
      if (e.keyCode === 8 && letter3backup.length === 0) {
        document.getElementById("letter2").focus();
      }
    } else {
      document.getElementById("letter3").value = "";
    }
  };

  handleKeyUp4 = (e) => {
    if (this.checkForAlphabets(e)) {
      let letter4backup = this.letter4;
      this.handleInput4(e);
      if (e.keyCode === 8 && letter4backup.length === 0) {
        document.getElementById("letter3").focus();
      }
    } else {
      document.getElementById("letter4").value = "";
    }
  };

  handleInput1 = (e) => {
    this.letter1 = e.target.value;
    this.handleInputChange();
    if (this.letter1.length > 0 && e.keyCode !== 8)
      document.getElementById("letter2").focus();
  };

  handleInput2 = (e) => {
    this.letter2 = e.target.value;
    this.handleInputChange();
    if (this.letter2.length > 0 && e.keyCode !== 8)
      document.getElementById("letter3").focus();
  };

  handleInput3 = (e) => {
    this.letter3 = e.target.value;
    this.handleInputChange();
    if (this.letter3.length > 0 && e.keyCode !== 8)
      document.getElementById("letter4").focus();
  };

  handleInput4 = (e) => {
    this.letter4 = e.target.value;
    this.handleInputChange();
    if (this.letter3.length > 0 && e.keyCode !== 8)
      document.getElementById("guessbutton").focus();
  };

  handleInputChange = (e) => {
    this.props.handleInputErrorMessage("");
    if (this.letter1 && this.letter2 && this.letter3 && this.letter4) {
      let word = this.letter1 + this.letter2 + this.letter3 + this.letter4;
      if (
        this.handleCheckForDuplicates(word) &&
        this.props.checkForStringInJsonData(word)
      ) {
        this.props.handleInputErrorMessage("");
        this.setState({ guessButtonDisabled: false });
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
    this.letter1 = "";
    this.letter2 = "";
    this.letter3 = "";
    this.letter4 = "";
    this.setState({ guessButtonDisabled: true });
    document.getElementById("letter1").focus();
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
            pattern="[A-Za-z]{1}"
            onKeyUp={this.handleKeyUp1}
          />
          <input
            className="letter2"
            id="letter2"
            type="text"
            size="1"
            maxLength="1"
            required
            pattern="[A-Za-z]{1}"
            onKeyUp={this.handleKeyUp2}
          />
          <input
            className="letter3"
            id="letter3"
            type="text"
            size="1"
            maxLength="1"
            required
            pattern="[A-Za-z]{1}"
            onKeyUp={this.handleKeyUp3}
          />
          <input
            className="letter4"
            id="letter4"
            type="text"
            size="1"
            maxLength="1"
            required
            pattern="[A-Za-z]{1}"
            onKeyUp={this.handleKeyUp4}
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
