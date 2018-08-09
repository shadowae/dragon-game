import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cssModule from 'react-css-modules';
import { Image, ProgressBar } from 'react-bootstrap';
import { classname } from 'classnames';
import styles from './PlayerComponent.css';
// import Diamond from '../../assets/dragon.png';
var Diamond = require('../../assets/dragon.png');
var Knight = require('../../assets/knight.jpg');


class PlayerComponent extends Component {
  render () {
    const barStyle = () => {
      if(this.props.health > 80) {
        return 'success';
      } else if (this.props.health > 40) {
        return 'warning';
      } else {
        return 'danger';
      }
    }
    return (
      <div className='mainDiv'>
        <div className='image'><Image src={this.props.image === 'dragon' ? Diamond : Knight} responsive/> </div>
        <div className='name'>{this.props.name}</div>
        <div className='health'>
          <ProgressBar active bsStyle={barStyle()} label={`${this.props.health}%`} now={this.props.health} />
        </div>
      </div>
    )
  }
}

PlayerComponent.PropTypes = {
  name: PropTypes.string.isRequired,
  health: PropTypes.number.isRequired,
  image: PropTypes.string,
}

PlayerComponent.defaultProps = {
  image: '',
};


export default cssModule(PlayerComponent, styles);
