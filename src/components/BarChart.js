import React, { Component } from 'react';
import {BarChart} from 'react-easy-chart';
import ToolTip from './ToolTips';
import Legend from './Legend';

import config from '../config/base';



export default class BarChartComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
        item: this.props.item,
        loading: true,
        data: [],
        showToolTip: false,
        top: 0,
        left: 0,
        x: '',
        y: 0,
        config: []
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

  }

  componentDidMount(){
     fetch(`${config.root}/${this.props.testDataChoice(this.props.item.data)}/${this.props.testFilterDate(this.props.item.filterDate)}`,{
         headers: {
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*'
         }
     })
        .then(res => 
            res.json())
        .then(json => {
            
            if (json) {
                var data = json.map(item => { return {y: item.result, x: item.id, color: this.props.getRandomColor()} });
                var config = data.map((item) => { return {color: item.color} })
                
                
                this.setState({
                    loading: false,
                    data: data,
                    config: config
                })
            }
        })
        .catch(error => console.log("error", error))
  }  

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      y: d.y,
      x: d.x});
  }

  mouseMoveHandler(d, e) {
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  render() {
      return(
          <div>
              { this.state.loading ?
                <div>Loading...</div>
                :
                <div>
                    <h2>{this.props.item.data} {this.props.item.filterDate.toLowerCase()}</h2>
                    <BarChart id={this.state.item.id}
                        axes
                        grid
                        colorBars
                        height={396}
                        width={500}
                        data={this.state.data}
                        mouseOverHandler={this.mouseOverHandler}
                        mouseOutHandler={this.mouseOutHandler}
                        mouseMoveHandler={this.mouseMoveHandler}
                        />
                    <Legend data={this.state.data} dataId={this.state.key} horizontal config={this.state.config} />
                    {(this.state.showToolTip) ?
                        <ToolTip
                            top={this.state.top}
                            left={this.state.left}
                            title={this.state.x}
                            value={this.state.y}
                            />
                        :
                        <div></div>
                    }
                 </div>
              }
          </div>
      )
  }
}
