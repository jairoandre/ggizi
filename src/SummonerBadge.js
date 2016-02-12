import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions, FlatButton, Badge} from 'material-ui/lib';
import {profilePicUrl, getMatchList, httpResponseToJSONArray, getChampionByKey, getChampions} from './Api';


const toDate = (timestamp) => {
  var a = new Date(timestamp);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


export default class SummonerBadge extends Component {

  constructor(props) {
    super(props);    
    this.state = {matches: {}, loading: true, champions: []};
  }

  componentWillMount() {
    Promise.all([getMatchList(this.props.summoner.id), getChampions()]).then(
        (resp) => {
          this.setState({...this.state, matches: JSON.parse(resp[0]), champions: resp[1], loading: false});
        },
        (reason) => {
          console.error('Ops! Something went wrong', reason);
          this.setState({...this.state, loading: false});
        }
    );    
  }  

  render() {

    const matchList = () => {
    return (<div>
      {
        this.state.matches.matches ? 
        this.state.matches.matches.map((match, idx) => {
          return (<div key={idx}>
              {getChampionByKey(match.champion).name}
              <div>{toDate(match.timestamp)}</div>
            </div>)}) : ''}
        </div>);
    }

    return (
      <Card style={{position: 'relative'}}>
        <CardHeader
          title={this.props.summoner.name}
          subtitle={'Level ' + this.props.summoner.summonerLevel}
          avatar={profilePicUrl(this.props.summoner.profileIconId)}>
        </CardHeader>          
        <CardText>
          <Card secondary={true} style={{width: 'auto', position: 'absolute', top: '5', right: '5'}}><CardText style={{color: '#ffffff', background: '#51878C'}}>{this.state.matches.totalGames} Fetched Games</CardText></Card>
          {this.state.loading ? 'Carregando...' : matchList()}
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
      
      )
  } 

}