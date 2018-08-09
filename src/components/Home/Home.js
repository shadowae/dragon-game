import React, { Component } from 'react';
import cssModule from 'react-css-modules';
import { Panel, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

import styles from './Home.css';

class Home extends Component {

  newGameQn = 'Game On! Are you Ready?';

  render () {
    return (
      <div className='container'>
          <Panel.Body>
            <div className='qn'>{this.newGameQn}</div>
            <div className='button'>
              <ButtonToolbar>
                {/* Indicates a successful or positive action */}
                <Button bsStyle="success" onClick={() => {this.props.startGameFunction(true)}}>Success</Button>
              </ButtonToolbar>
            </div>
          </Panel.Body>
      </div>
    )
  } 
}

export default cssModule(Home, styles);
