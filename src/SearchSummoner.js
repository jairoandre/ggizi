import React, {Component, PropTypes} from 'react';
import {Paper, TextField, AppBar, RaisedButton, Avatar, RefreshIndicator} from 'material-ui/lib';

const httpGet = (url) => {
  return new Promise(
    function (resolve, reject) {

      var req = new XMLHttpRequest();

      req.open('GET', url);

      req.onload = () => {
        if (req.status === 200) {
          // Success
          resolve(req.response);
        } else {
          // Something went wrong (404 etc.)
          reject(new Error(req.statusText));
        }
      };

      req.onerror = () => {
        reject(new Error(
          'XMLHttpRequest Error: ' + req.statusText));
      };
      req.send();
    });
}

export default class SearchSummoner extends Component {

  constructor(props) {
    super(props);
    this.state = {summoner: [], status: 'ready', url: ''};
  }

  render() {

    const apiKey = '?api_key=bfea1361-9fff-45f8-a8c0-1ff8025da116';
    const byName = 'https://br.api.pvp.net/api/lol/br/v1.4/summoner/by-name/';

    const _setState = (newState) => {
      this.setState({...this.state, ...newState});
    };

    const handleInputChange = (event) => {
      this.refs.searchInput = event.target.value;
    }

    const handleSearch = () => {
      this.setState({...this.state, status: 'loading'});
      httpGet(byName + this.refs.searchInput + apiKey).then(
        (response) => {
          _setState({status: 'ready', summoner: response});
        },
        function (reason) {
          console.error('Ops! Something went wrong', reason)
          _setState({status: 'ready'});
        }
      );
    }

    const loading = () => {
      return <RefreshIndicator
        size={20}
        left={10}
        top={10}
        status={this.state.status}
        style={{display: 'inline-block', position: 'relative'}}
      />;
    }

    return (
      <div>
        <Paper zDepth={2}>
          <AppBar
            title="GGIZI"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div style={{padding: '20px'}}>
            <TextField ref="searchInput" floatingLabelText="Summoner" onChange={handleInputChange} />
            {'   '}
            {loading()}
            <br/>
            <RaisedButton label="Search" onClick={handleSearch} secondary={true}/>
            <p>{this.state.summoner}</p>
          </div>
        </Paper>
      </div>
    );
  }
}