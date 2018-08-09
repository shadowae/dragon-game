import React, { Component } from 'react';
import { random } from 'lodash';

import logo from './logo.svg';
import './App.css';

import { Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap';


//import a GameScreen
import GameScreen from './components/GameScreen'
import Home from './components/Home'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStart: false,
    };
  }

  newGameReset = (gameStart) => {
    this.setState({
      gameStart,
    }, () => {console.log('This is the gameStart state',this.state.gameStart)})
  };

  whatToRender = () => {
    if(this.state.newGame) {
      return (
        <div>
      </div>
      )
    } else {
      return (
        <div>
          <Home startGameFunction={this.newGameReset}/>
        </div>
      )
    }
  };

  render() {
    return (
      <div> {<GameScreen endGameFunction={this.newGameReset}/>}
      </div>
    );
  }
}

export default App;
