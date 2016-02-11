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
    this.state = {summoner: [], loading: false, url: ''};
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
      _setState({loading: true})
      httpGet(byName + this.refs.searchInput + apiKey).then(
        (response) => {
          _setState({loading: false});
          setTimeout(() => {_setState({summoner: [response]})}, 300);
        },
        function (reason) {
          console.error('Ops! Something went wrong', reason)
          _setState({loading: false});
        }
      );
    }

    const setLoading = (_loading) => {
      this.setState({...this.state, loading: _loading});
    }

    const handleSearch = () => {
      getByName();
    }

    const loading = () => {
      return (
        <div style={{position: 'absolute', left: (window.innerWidth/2 - 25)}}>
          <RefreshIndicator
            key='loading'
            size={50}
            left={0}
            top={0}
            status='loading'/>
        </div>);
    }

    return (
      <div>
          <AppBar
            title="GGIZI"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div style={{padding: '20px'}}>
            <TextField ref="searchInput" floatingLabelText="Summoner" onChange={handleInputChange} />            
            <br/>
            <RaisedButton label="Search" onClick={handleSearch} secondary={true}/>
            <ReactCSSTransitionGroup 
            transitionName="show"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={250}>
              {this.state.summoner.map((item) => {return (<div key="summoner">{item}</div>);})}
            </ReactCSSTransitionGroup>
          </div>
          <ReactCSSTransitionGroup 
            transitionName="loading"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={250}>
            {this.state.loading ? loading() : ''}
          </ReactCSSTransitionGroup>
      </div>
    );
  }
}