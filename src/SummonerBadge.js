import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Paper, TextField, AppBar, RaisedButton, Avatar, RefreshIndicator, FontIcon} from 'material-ui/lib';

const cdn = 'http://ddragon.leagueoflegends.com/cdn/';

const version = '6.3.1';

export default class SummonerBadge extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <img src={cdn + version + '/img/profileicon/' + this.props.summoner.profileIconId + '.png'}/>
        <span style={{fontSize: '40px'}}>{this.props.summoner.name}</span>
      </div>
      )
  } 

}