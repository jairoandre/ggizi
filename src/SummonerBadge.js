import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions, FlatButton} from 'material-ui/lib';

const cdn = 'http://ddragon.leagueoflegends.com/cdn/';

const version = '6.3.1';

export default class SummonerBadge extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Card>
        <CardHeader
          title={this.props.summoner.name}
          subtitle={'Level ' + this.props.summoner.summonerLevel}
          avatar={cdn + version + '/img/profileicon/' + this.props.summoner.profileIconId + '.png'}
        />
        <CardMedia
          overlay={<CardTitle title={this.props.summoner.name} subtitle={'Level ' + this.props.summoner.summonerLevel} />}>
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>      
      )
  } 

}