import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions, FlatButton, Badge} from 'material-ui/lib';
import {profilePicUrl, getMatchList, httpResponseToJSONArray} from './Api';


export default class SummonerBadge extends Component {

  constructor(props) {
    super(props);    
    this.state = {matches: {}, loading: true};
  }

  componentDidMount() {
    getMatchList(this.props.summoner.id).then(
        (response) => {
          this.setState({...this.state, matches: JSON.parse(response), loading: false})
        },
        (reason) => {
          console.error('Ops! Something went wrong', reason);
          this.setState({...this.state, loading: false});
        }
      );
  }

  render() {

    return (
      <Card>
        <CardHeader
          title={this.props.summoner.name}
          subtitle={'Level ' + this.props.summoner.summonerLevel}
          avatar={profilePicUrl(this.props.summoner.profileIconId)}>
        </CardHeader>          
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.c
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          <Card primary={true}><CardText>{this.state.matches.totalGames} Fetched Games</CardText></Card>
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
      
      )
  } 

}