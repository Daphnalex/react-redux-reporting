import React, { Component } from 'react';
import {PieChart} from 'react-easy-chart';
import ToolTip from './ToolTips';
import Legend from './Legend';
import config from '../config/base';



export default class PieChartComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
        item: this.props.item,
        loading: true,
        data: [],
        showToolTip: false,
        top: 0,
        left: 0,
        value: 0,
        key: "",
        config: []
    }

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    this.styles = {
        '.pie-chart-lines': {
          stroke: 'rgba(0, 0, 0, 1)',
          strokeWidth: 1
        },
        '.pie-chart-text': {
          fontSize: '10px',
          fill: 'white'
        }
      };
  }

  componentDidMount = () => {
    console.log('item', this.state.item);
    fetch(`${config.root}/${this.props.testDataChoice(this.props.item.data)}/${this.props.testFilterDate(this.props.item.filterDate)}`,{
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
     })
    .then(res => 
        res.json())
    .then(json => {
        console.log('JSON',json);
            
        if (json) {
            var data = json.map(item => { return {value: item.result, key: item.id, color: this.props.getRandomColor()} });
            var config = data.map(item => { return {color: item.color} });
            console.log('CONFIG COLOR',config)
            console.log('DATA',data);
            this.setState({
                loading: false,
                data: data,
                config: config
            })
        }
    })
    .catch(error => console.log("error", error));
  }  

  mouseOverHandler = (d, e) => {
    console.log('mouse over');
    console.log('d',d);
    console.log('e',e);
    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      value: d.value,
      key: d.data.key
    },function(){
        console.log('post over',this.state.key)
    })
  }

  mouseMoveHandler = (d, e) => {
    console.log('mouse move',e);
    console.log("DDD",d)
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  mouseOutHandler = () => {
    console.log('mouse Out');
    this.setState({showToolTip: false});
  }

  createTooltip = () => {
    console.log("createTooltip function")
    if (this.state.showToolTip) {
        return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          The value of {this.state.key} is {this.state.value}
        </ToolTip>
      );
    }
    return false;
  }

 getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
      console.log('type of value',typeof(this.state.value))
      
      return(
          <div>
              { this.state.loading ?
                <div>Loading...</div>
                :
                <div>
                    <h2>{this.props.item.data} {this.props.item.filterDate.toLowerCase()}</h2>
                    <PieChart id={this.state.item.id}
                    data={this.state.data} 
                    innerHoleSize={200}
                    mouseOverHandler = {this.mouseOverHandler}
                    mouseOutHandler = {this.mouseOutHandler}
                    mouseMoveHandler = {this.mouseMoveHandler}
                    padding={10}
                    styles={this.styles}
                    />
                    <Legend data={this.state.data} dataId={this.state.key} horizontal config={this.state.config} />
                    {(this.state.showToolTip) ?
                        <ToolTip
                            top={this.state.top}
                            left={this.state.left}
                            title={this.state.key}
                            value={this.state.value}
                            />
                        :
                        <div></div>}
                </div>
              }
          </div>
      )
  }
}
