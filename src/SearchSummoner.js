import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Paper, TextField, AppBar, RaisedButton, Avatar, RefreshIndicator, FontIcon} from 'material-ui/lib';
import SummonerBadge from './SummonerBadge';

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

const httpResponseToJSONArray = (response) => {
  let parsedJSON = JSON.parse(response);
  return Object.keys(parsedJSON).map((key) => {return parsedJSON[key]});
}

export default class SearchSummoner extends Component {

  constructor(props) {
    super(props);
    this.state = {summoners: [], loading: false, url: ''};
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
      _setState({summoners: [], loading: true})
      httpGet(byName + this.refs.searchInput + apiKey).then(
        (response) => {
          _setState({loading: false});
          setTimeout(() => {_setState({summoners: httpResponseToJSONArray(response)})}, 300);
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

    const searchForm = () => {
      return (
        <div style={{margin: '20px'}}>
        <TextField ref="searchInput" fullWidth={true} floatingLabelText="Summoner" onChange={handleInputChange} />
            <RaisedButton
              onClick={handleSearch}
              secondary={true}
              icon={<FontIcon className="material-icons">search</FontIcon>}
              label="SEARCH"/>
        </div>
        );
    }

    return (
      <div>
          <AppBar
            title="GGIZI"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <ReactCSSTransitionGroup
                  transitionName="show"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={250}>
            {this.state.summoners.size > 0 ? '' : searchForm()}
          </ReactCSSTransitionGroup>
          <div style={{padding: '20px'}}>
            
              <ReactCSSTransitionGroup
                  transitionName="show"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={250}>
              {this.state.summoners.reverse().map((item, idx) => {
                return (
                    <SummonerBadge key={idx} summoner={item}/>
                  );
                })
              }
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