import React, {Component, PropTypes} from 'react';
import {Paper, TextField, RaisedButton, List, ListItem, FontIcon} from 'material-ui/lib';
import Mojs from './Mojs';

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {id: action.id, text: action.text, completed: false}];
    case 'TOGGLE_TODO':
      return state.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      });
    default:
      return state;
  }

}

export default class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {todos: [], id: 0, text: ''};
  }

  render() {

    const handleAddTodo = () => {
      if (this.refs.input.getValue() === '') {

      }
      this.setState({
        todos: todos(this.state.todos, {id: this.state.id, type: 'ADD_TODO', text: this.state.text}),
        id: this.state.id + 1,
        text: ''
      });
      this.refs.input.setValue('');
    }

    const handleToggle = (id) => {
      this.setState({todos: todos(this.state.todos, {id: id, type: 'TOGGLE_TODO'})});
    }

    const handleChange = (evt) => {
      this.setState({text: evt.target.value});
    }

    return (
      <div>
        <Paper zDepth={2}>
          <div style={{padding: '20px'}}>
            <TextField onChange={handleChange} onSubmit={handleAddTodo} ref="input" hintText="Type anything..." floatingLabelText="What to do?"/>
            <br/><br/>
            <RaisedButton label="ADD" onClick={handleAddTodo} secondary={true}/>
            <br/><br/>
            <List>
              {this.state.todos.map((item) =>
                <ListItem
                  key={item.id}
                  onClick={() => {handleToggle(item.id)}}
                  style={{textDecoration: item.completed ? 'line-through' : 'none'}}
                  leftIcon={<FontIcon className="material-icons">{item.completed ? 'done' : 'info'}</FontIcon>}
                  primaryText={item.text}/>)}
            </List>
          </div>
        </Paper>
      </div>
    );
  }
}