import React, { Component } from "react";
import GuessedWordItem from "./guessedworditem.component";

export default class GuessedWords extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.guessedWords.map((word, index) => {
          return (
            <div key={"guessedWords" + index}>
              <GuessedWordItem
                word={word}
                wordNeedsToBeGuessed={this.props.wordNeedsToBeGuessed}
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
