import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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

let id = 0;

export default class SearchSummoner extends Component {

  constructor(props) {
    super(props);
    this.state = {summoner: [], status: 'ready', url: '', divs: []};
  }

  render() {

    const apiKey = '?api_key=bfea1361-9fff-45f8-a8c0-1ff8025da116';
    const byName = 'https://br.api.pvp.net/api/lol/br/v1.4/summoner/by-name/';

    const styles = require('./main.css');

    const _setState = (newState) => {
      this.setState({...this.state, ...newState});
    };

    const handleInputChange = (event) => {
      this.refs.searchInput = event.target.value;
    }

    const getByName = () => {
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

    const setStatus = (_status) => {
      this.setState({...this.state, status: _status});
    }

    const handleSearch = () => {
      _setState({divs: [...this.state.divs, <div key={++id} className={styles.divTeste}>Teste {id}</div>]})
      // setStatus('loading');
      // setTimeout(() => {setStatus('ready')}, 3000);
    }

    const loading = () => {
      return (
      <ReactCSSTransitionGroup transitionName="loading"
        transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <RefreshIndicator
          key='loading'
          size={50}
          left={window.innerWidth/2 - 25}
          top={100}
          status={this.state.status}/>
      </ReactCSSTransitionGroup>);
    }

    return (
      <div>
          <AppBar
            title="GGIZI"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div style={{padding: '20px'}}>
            <TextField ref="searchInput" floatingLabelText="Summoner" onChange={handleInputChange} />            
            {(this.state.status == 'loading') ? loading() : ''}
            <br/>
            <RaisedButton label="Search" onClick={handleSearch} secondary={true}/>
            <p>{this.state.summoner}</p>
          </div>
          <ReactCSSTransitionGroup 
            transitionName="loading"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {this.state.divs}
          </ReactCSSTransitionGroup>
      </div>
    );
  }
}