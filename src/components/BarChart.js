import React, { Component } from 'react';
import {BarChart} from 'react-easy-chart';
import ToolTip from './ToolTips';
import Legend from './Legend';
import config from '../config/base';

import {connect} from 'react-redux';

import {apiFetchData, dataIsLoading, data, dataHasErrored} from '../actions/fetchActions';

class BarChartComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
        item: this.props.item,
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

  componentDidMount = () => {
    var url = `${config.root}/${this.props.item.dataFetch}/${this.props.item.filterDate}`;
    this.props.apiFetchData(url);

  }  

  transformData = (data) => {
      //console.log('UPDATE',data);
      var data = data.map((item)=>{
            console.log('dans la boucle',item)
          return {x: item.id, y: item.result}
      })
      //console.log('DATA TRANSFORME',data);
      return data;
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
              { this.props.dataIsLoading ?
                <div>Loading...</div>
                :
                <div>
                    <h2>{this.props.item.describeElement.data} {this.props.item.describeElement.filterDate.toLowerCase()}</h2>
                    <BarChart id={this.state.item.id}
                        axes
                        grid
                        colorBars
                        height={396}
                        width={500}
                        data={this.transformData(this.props.data)}
                        mouseOverHandler={this.mouseOverHandler}
                        mouseOutHandler={this.mouseOutHandler}
                        mouseMoveHandler={this.mouseMoveHandler}
                        />
                    <Legend data={this.transformData(this.props.data)} dataId={this.state.key} horizontal config={this.state.config} />
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

const mapStateToProps = (state) => {
    console.log("STATE",state);
    return {
        dataIsLoading: state.dataIsLoading,
        dataHasErrored: state.dataHasErrored,
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiFetchData: (data) => {
            dispatch(apiFetchData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BarChartComponent);