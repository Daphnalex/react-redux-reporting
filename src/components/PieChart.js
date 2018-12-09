import React, { Component } from 'react';
import {PieChart} from 'react-easy-chart';

import ToolTip from './ToolTips';
import Legend from './Legend';
import Filters from './FiltersComponent';

import {apiFetchData} from '../actions/fetchActions';

import {connect} from "react-redux";

class PieChartComponent extends Component {

  constructor(props){
    
    super(props);

    this.state = {
        showToolTip: false,
        top: 0,
        left: 0,
        value: 0,
        key: "",
        id: this.props.item.id,
        config: this.props.config,
        configComponent: []
    }
    ////console.log('CONSTRUCTOR ID',this.state.id)
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    ////console.log('LES COULEURS DU STATE',this.state.config)
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

  transformData = (data) => {
    var newData = data.map((item,i)=>{
        return {key: item.id, value: item.result, color: this.state.config[i]}
    });
    return newData;
  }


  mouseOverHandler = (d, e) => {

    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      value: d.value,
      key: d.data.key
    })
  }

  mouseMoveHandler = (d, e) => {
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  mouseOutHandler = () => {
    this.setState({showToolTip: false});
  }

  createTooltip = () => {
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

  render() {
       console.log('data props dans render Pie',this.props);
       
       
      return(
          <div>
              {this.props.dataIsLoading.bool ?
                <div>
                    Donnée en cours de chargement
                </div>
                :
                <div>
                    <h2>{this.props.item.describeElement.data} {this.props.item.describeElement.filterDate.toLowerCase()} ({this.props.item.describeElement.graph})</h2>
                    <Filters item={this.props.item} />
                    <div key={`Pie${this.props.data.id}`}>
                        {(this.props.data.id === this.props.item.id) ?
                            <div>
                                <PieChart id={this.props.item.id}
                                data={this.transformData(this.props.data.array)} 
                                innerHoleSize={200}
                                mouseOverHandler = {this.mouseOverHandler}
                                mouseOutHandler = {this.mouseOutHandler}
                                mouseMoveHandler = {this.mouseMoveHandler}
                                padding={10}
                                styles={this.styles}
                                />
                                <Legend data={this.transformData(this.props.data.array)} dataId={this.state.key} horizontal config={this.state.configComponent} />
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

export default connect (undefined, mapDispatchToProps)(PieChartComponent);

