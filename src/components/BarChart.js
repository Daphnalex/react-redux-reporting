import React, { Component } from 'react';
import {BarChart} from 'react-easy-chart';
import ToolTip from './ToolTips';
import Legend from './Legend';
import Filters from './FiltersComponent';


import {connect} from 'react-redux';

import {apiFetchData} from '../actions/fetchActions';

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
        config: this.props.config
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

  } 

  transformData = (data) => {
      ////console.log('UPDATE',data);
      var newData = data.map((item,i)=>{
            //console.log('dans la boucle',item)
          return {x: item.id, y: item.result, color: this.state.config[i]}
      })
      ////console.log('DATA TRANSFORME',data);
      return newData;
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
    //console.log('data props dans render Pie',this.props.data);
    return(
        <div>
              {this.props.dataIsLoading.bool ?
                <div>
                    Donnée en cours de chargement
                </div>
                :
                <div>
                    <h2>{this.props.item.describeElement.data} {this.props.item.describeElement.filterDate.toLowerCase()}({this.props.item.describeElement.graph})</h2>
                    <Filters item={this.props.item} />
                    <div key={`Pie${this.props.data.id}`}>
                        {(this.props.data.id === this.props.item.id) ?
                            <div>
                                <BarChart id={this.props.item.id}
                                axes
                                grid
                                colorBars
                                height={396}
                                width={500}
                                data={this.transformData(this.props.data.array)}
                                mouseOverHandler={this.mouseOverHandler}
                                mouseOutHandler={this.mouseOutHandler}
                                mouseMoveHandler={this.mouseMoveHandler}
                                />
                                <Legend data={this.transformData(this.props.data.array)} dataId={this.state.key} horizontal config={this.state.configComponent} />
                                {(this.state.showToolTip) ?
                                    <ToolTip
                                    top={this.state.top}
                                    left={this.state.left}
                                    title={this.state.x}
                                    value={this.state.y}
                                    />
                                :
                                <div></div>}
                            </div>
                            :
                            <div>Donnée non trouvée</div>
                        }
                    </div>
                </div>
              }
          </div>  
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiFetchData: (data,id) => {
            dispatch(apiFetchData(data,id));
        }
    }
}

export default connect(undefined, mapDispatchToProps) (BarChartComponent);