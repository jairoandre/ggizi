import React, {Component} from 'react';
import {RaisedButton} from 'material-ui';
import mojs from 'mo-js';

export default class Mojs extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], anims: []};
  }

  render() {

    const runMojs = () => {
      if (this.state.anims) {
        this.state.anims.forEach((func) => {
          func();
        });
      }
    }

    const init = () => {
      let items = [];
      let anims = [];

      for (let idx = 0; idx < 10; idx++) {
        items.push(<div key={idx} id={'js-square' + idx} style={{
          width:      '50px',
          height:     '50px',
          marginLeft: '5px',
          float: 'right',
          background: '#F64040'}}>
          {idx}
        </div>);
        anims.push(() => {
          let square = document.querySelector('#js-square' + idx);
          let anim = new mojs.Tween({
            repeat: 0,
            delay: 100 + (idx * 100),
            onUpdate: function (progress) {
              let bounceProgress = mojs.easing.bounce.out(progress);
              square.style.transform = 'translateY(' + 200 * bounceProgress + 'px)';
            }
          });
          anim.run();
        });
      }

      this.setState({items: items, anims: anims});
    }


    return (
      <div>
        <RaisedButton label="Reset" onClick={() => {this.setState({items: [], anims: []})}} secondary={true}/>
        {'  '}
        <RaisedButton label="Inicializar" onClick={init} secondary={true}/>
        {'  '}
        <RaisedButton label="Animar" onClick={runMojs} secondary={true}/>
        {this.state.items}
      </div>
    );
  }
}