import React, { Component }  from 'react';
import cssModule from 'react-css-modules';
import { random } from 'lodash';
import { Grid, Row, Col, ButtonGroup, Button, Modal } from 'react-bootstrap';

import styles from './GameScreen.css';
//import a player
import PlayerComponent from './../PlayerComponent'
import Commentary from './../Commentary'


class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHealth: 100,
      dragonHealth: 100,
      show: false,
      log: [],
    };
  }

  attackFunction = (minValue = 0, maxValue = 10, isHeal = false) => {
    const tempLog = this.state.log;
    let playerAction = random(minValue, maxValue);
    if (isHeal) {
      playerAction = -playerAction; 
    }
    tempLog.push({
      owner: 'Player',
      damage: playerAction,
    });
    const dragonAction = random(minValue, maxValue);
    tempLog.push({
      owner: 'Dragon',
      damage: dragonAction,
    });
    this.setState({
      playerHealth: this.state.playerHealth - playerAction,
      dragonHealth: this.state.dragonHealth - dragonAction,
      log: tempLog,
    }, () => {
      this.checkEndOfGame();
    });
  }

  blastFunction = () => {
    this.attackFunction(10,20);
  }

  shieldFunction = () => {
    this.attackFunction(15,20, true);
  }

  giveUpFunction = () => {
    this.checkEndOfGame(true);
  }

  checkEndOfGame = (giveup = false) => {
    if(this.state.playerHealth <= 0 || this.state.dragonHealth <= 0 || giveup) {
      // this.props.endGameFunction(false);
      this.setState({ 
        show: true 
      })
    }
  }

  handleHide = () => {
    this.setState({ 
      show: false,
      playerHealth: 100,
      dragonHealth: 100,
      log: [],
    });
  }

  renderModalTitle = () => {
    if(this.state.playerHealth > 0 && this.state.dragonHealth > 0) {
      return ('You have given up!');
    } else if (this.state.playerHealth > 0) {
      return ('You have won!');
    } else {
      return ('Dragon has won!');
    }
  }

  renderModal = () => (
    <div className="modal-container" style={{ height: 200 }}>
         <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                {this.renderModalTitle()}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you wish to replay?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Continue</Button>
            </Modal.Footer>
          </Modal>
        </div>
  )

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PlayerComponent name='player 1' health={this.state.playerHealth} image={'knight'}/>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <PlayerComponent name='Comp' health={this.state.dragonHealth} image={'dragon'}/>
            </Col>
          </Row>
          <Row>
            <ButtonGroup justified>
              <Button href="#" onClick={this.attackFunction}>Attack</Button>
              <Button href="#" onClick={this.blastFunction}>Blast</Button>
              <Button href="#" onClick={this.shieldFunction}>Shield</Button>
              <Button href="#" onClick={this.giveUpFunction}>GiveUp</Button>
            </ButtonGroup>
          </Row>
          <Row>
            <Commentary log={this.state.log}/>
          </Row>
        </Grid>
        {this.renderModal()}
      </div>
    );
  }
}

export default cssModule(GameScreen, styles);
