import React, {Component} from 'react';
import cssModule from 'react-css-modules';
import { Table } from 'react-bootstrap';

import styles from './Commentary.css';

class Commentary extends Component {

  renderRow = (log) => {
    const isAttack = (damage) => {
      if(damage <= 0) {
        return (' has healed for ' + -damage);
      } else {
        return (' has attacked for ' + damage);
      }
    }
    return (
      <tr>
        <td align='center'>
          {log.owner + isAttack(log.damage)}
        </td>
      </tr>
    );
  }

  render () {
    return (
      <div className='tableContainer'>
        <Table responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Game Commentary</th>
            </tr>
          </thead>
          <tbody>
            {this.props.log.map((logItem) => {return this.renderRow(logItem)})}
          </tbody>
        </Table>
      </div>
    )
  } 
}

export default cssModule(Commentary, styles);
