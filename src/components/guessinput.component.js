import React, { Component } from "react";

export default class GuessInput extends Component {
  state = {
    guessButtonDisabled: false,
    letter1: "",
    letter2: "",
    letter3: "",
    letter4: "",
  };

  componentDidMount = () => {
    document.getElementById("letter1").focus();
  };

  getWordFromState = () => {
    let word =
      this.state.letter1 +
      this.state.letter2 +
      this.state.letter3 +
      this.state.letter4;
    return word;
  };

  displayAllLetters = () => {
    console.log("word = " + this.getWordFromState());
  };

  handleAllInputs = () => {
    let word = this.getWordFromState();
    this.checkWordForErrors(word);
  };

  checkWordForErrors = (word) => {
    this.props.handleInputErrorMessage("");
    if (word.length === 4) {
      if (this.checkForDuplicates(word)) {
        this.props.handleInputErrorMessage(
          "guesses cannot have repeating letters!"
        );
      } else if (!this.props.checkForStringInJsonData(word)) {
        this.props.handleInputErrorMessage("Not a valid word!");
      } else {
        this.setState({ guessButtonDisabled: false });
      }
    } else {
      this.setState({ guessButtonDisabled: true });
    }
  };

  checkForAlphabets = (e) => {
    let asciiValue = e.charCodeAt(0);
    if (
      (asciiValue > 64 && asciiValue < 91) ||
      (asciiValue > 96 && asciiValue < 123)
    )
      return true;
    else return false;
  };

  checkForDuplicates = (e) => {
    let map = new Map();
    for (let i = 0; i < 4; i++) {
      if (map.has(e[i])) {
        return true;
      }
      map.set(e[i], 0);
    }
    return false;
  };

  handleInput1 = (e) => {
    if (this.checkForAlphabets(e.target.value)) {
      this.setState({ letter1: e.target.value[0] }, () => {
        this.handleAllInputs();
        document.getElementById("letter2").focus();
      });
    } else {
      this.setState({ letter1: "" }, () => {
        this.handleAllInputs();
      });
    }
  };

  handleInput2 = (e) => {
    if (this.checkForAlphabets(e.target.value)) {
      this.setState({ letter2: e.target.value[0] }, () => {
        this.handleAllInputs();
        document.getElementById("letter3").focus();
      });
    } else {
      this.setState({ letter2: "" }, () => {
        this.handleAllInputs();
      });
    }
  };

  handleInput3 = (e) => {
    if (this.checkForAlphabets(e.target.value)) {
      this.setState({ letter3: e.target.value[0] }, () => {
        this.handleAllInputs();
        document.getElementById("letter4").focus();
      });
    } else {
      this.setState({ letter3: "" }, () => {
        this.handleAllInputs();
      });
    }
  };

  handleInput4 = (e) => {
    console.log("handle input 4", e);
    if (this.checkForAlphabets(e.target.value)) {
      this.setState({ letter4: e.target.value[0] }, () => {
        this.handleAllInputs();
      });
    } else {
      this.setState({ letter4: "" }, () => {
        this.handleAllInputs();
      });
    }
  };

  handleOnKey1 = (e) => {
    console.log("handleOnKey1", e.keyCode);
    console.log("letter 1 length = ", this.state.letter1.length);
    if (e.keyCode === 8 && this.state.letter2.length === 1) {
      this.setState({ letter1: "" }, () => {
        document.getElementById("letter1").focus();
      });
    }
  };

  handleOnKey2 = (e) => {
    console.log("handleOnKey2", e.keyCode);
    console.log("letter 2 length = ", this.state.letter2.length);
    if (e.keyCode === 8 && this.state.letter2.length === 1) {
      this.setState({ letter2: "" }, () => {
        document.getElementById("letter2").focus();
      });
    }
    if (e.keyCode === 8 && this.state.letter2.length === 0) {
      this.setState({ letter1: "" }, () => {
        document.getElementById("letter1").focus();
      });
    }
  };

  handleOnKey3 = (e) => {
    console.log("handleOnKey3", e.keyCode);
    console.log("letter 3 length = ", this.state.letter3.length);
    if (e.keyCode === 8 && this.state.letter3.length === 1) {
      this.setState({ letter3: "" }, () => {
        document.getElementById("letter3").focus();
      });
    }
    if (e.keyCode === 8 && this.state.letter3.length === 0) {
      this.setState({ letter2: "" }, () => {
        document.getElementById("letter2").focus();
      });
    }
  };

  handleOnKey4 = (e) => {
    console.log("handleOnKey4", e.keyCode);
    console.log("letter 4 length = ", this.state.letter4.length);
    console.log(e.target);
    if (e.keyCode === 8 && this.state.letter4.length === 1) {
      this.setState({ letter4: "" }, () => {
        document.getElementById("letter4").focus();
      });
    }
    if (e.keyCode === 8 && this.state.letter4.length === 0) {
      this.setState({ letter3: "" }, () => {
        document.getElementById("letter3").focus();
      });
    }
  };

  handleGuessButton = (e) => {
    e.preventDefault();
    let word = this.getWordFromState();
    this.props.handleAddGuessedWords(word);
    document.getElementById("guess-input-form").reset();
    this.setState({ letter1: "" });
    this.setState({ letter2: "" });
    this.setState({ letter3: "" });
    this.setState({ letter4: "" });
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
            maxLength="1"
            value={this.state.letter1}
            onInput={this.handleInput1}
            onKeyUp={this.handleOnKey1}
          />
          <input
            className="letter2"
            id="letter2"
            type="text"
            maxLength="1"
            value={this.state.letter2}
            onInput={this.handleInput2}
            onKeyUp={this.handleOnKey2}
          />
          <input
            className="letter3"
            id="letter3"
            type="text"
            maxLength="1"
            value={this.state.letter3}
            onInput={this.handleInput3}
            onKeyUp={this.handleOnKey3}
          />
          <input
            className="letter4"
            id="letter4"
            type="text"
            maxLength="1"
            value={this.state.letter4}
            onInput={this.handleInput4}
            onKeyUp={this.handleOnKey4}
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
