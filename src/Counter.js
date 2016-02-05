import React, {Component, PropTypes} from 'react';
import {Paper, TextField, RaisedButton, Avatar} from 'material-ui/lib';
import Mojs from './Mojs';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  render() {

    const handlePlus = () => {
      this.setState({count: counter(this.state.count, {type: 'INCREMENT'})});
    }

    const handleMinus = () => {
      this.setState({count: counter(this.state.count, {type: 'DECREMENT'})});
    }


    return (
      <div>
        <Paper zDepth={2}>
          <div style={{padding: '20px'}}>
            <h1>{this.state.count}</h1>
            <RaisedButton label="+" onClick={handlePlus} secondary={true}/>
            {'    '}
            <RaisedButton label="-" onClick={handleMinus} secondary={true}/>
          </div>
        </Paper>
      </div>
    );
  }
}