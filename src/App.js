import React, {Component} from 'react';
import {Paper, TextField, RaisedButton} from 'material-ui/lib';

export default class App extends Component {
  render() {
    return(
      <div>
        <Paper zDepth={1}>
        <div style={{padding: '20px'}}>
          <TextField
            hintText="Digite o termo de busca"
            floatingLabelText="Termo" />
            <br/>
          <RaisedButton label="Buscar" secondary={true}/>
          </div>
        </Paper>
      </div>
      );
  }
}
