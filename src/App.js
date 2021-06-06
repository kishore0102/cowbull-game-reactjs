import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// import Topnav from "./components/topnav.component";
import Home from "./components/home.component";
import Game from "./components/game.component.js";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Topnav /> */}
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/game" component={() => <Game />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
