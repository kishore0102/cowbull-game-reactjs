import React, { Component } from "react";

export default class GuessedWordItem extends Component {
  state = {
    word1sel: false,
    word2sel: false,
    word3sel: false,
    word4sel: false,
  };

  render() {
    let wordNeedsToBeGuessed = this.props.wordNeedsToBeGuessed;
    let word = this.props.word;
    let word1 = word[0];
    let word2 = word[1];
    let word3 = word[2];
    let word4 = word[3];
    let guessedCorrect = 0;
    let guessedCorrectPos = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (word[i] === wordNeedsToBeGuessed[j]) {
          guessedCorrect++;
          if (i === j) {
            guessedCorrectPos++;
          }
        }
      }
    }

    return (
      <React.Fragment>
        <div className="d-flex justify-content-between guessedWordBorder">
          <div className="d-flex justify-content-start">
            <button
              type="button"
              style={
                this.state.word1sel
                  ? { textDecoration: "line-through", color: "lightgrey" }
                  : { textDecoration: "none", color: "black" }
              }
              onClick={() => {
                let curr = this.state.word1sel;
                this.setState({ word1sel: !curr });
              }}
              className="btn btn-light guessedWordButton"
            >
              {word1}
            </button>
            <button
              type="button"
              style={
                this.state.word2sel
                  ? { textDecoration: "line-through", color: "lightgrey" }
                  : { textDecoration: "none", color: "black" }
              }
              onClick={() => {
                let curr = this.state.word2sel;
                this.setState({ word2sel: !curr });
              }}
              className="btn btn-light guessedWordButton"
            >
              {word2}
            </button>
            <button
              type="button"
              style={
                this.state.word3sel
                  ? { textDecoration: "line-through", color: "lightgrey" }
                  : { textDecoration: "none", color: "black" }
              }
              onClick={() => {
                let curr = this.state.word3sel;
                this.setState({ word3sel: !curr });
              }}
              className="btn btn-light guessedWordButton"
            >
              {word3}
            </button>
            <button
              type="button"
              style={
                this.state.word4sel
                  ? { textDecoration: "line-through", color: "lightgrey" }
                  : { textDecoration: "none", color: "black" }
              }
              onClick={() => {
                let curr = this.state.word4sel;
                this.setState({ word4sel: !curr });
              }}
              className="btn btn-light guessedWordButton"
            >
              {word4}
            </button>
          </div>
          <div className="p-2">
            <span className="guessedWordResult">
              <span>{guessedCorrect}</span>
              <span>/</span>
              <span>{guessedCorrectPos}</span>
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
