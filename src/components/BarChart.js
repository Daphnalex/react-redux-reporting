import React, { Component } from 'react';
import {BarChart} from 'react-easy-chart';
import ToolTip from './ToolTips';
import Legend from './Legend';
import Filters from './FiltersComponent';
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
    var id = this.props.item.id;
    this.props.apiFetchData(url,id);
  }  

  transformData = (data) => {
      ////console.log('UPDATE',data);
      var data = data.map((item,i)=>{
            //console.log('dans la boucle',item)
          return {x: item.id, y: item.result, color: this.state.config[i]}
      })
      ////console.log('DATA TRANSFORME',data);
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
    //console.log('data props dans render Pie',this.props.data);
    return(
        <div>
            {this.props.dataIsLoading.map((item)=>(
              <div key={item.id}>
                  {(item.id === this.props.item.id) &&
                      <div>
                          {(item.bool) ?
                              <div>
                                  Donnée en cours de chargement
                              </div>
                              :
                              <div>
                                  <h2>{this.props.item.describeElement.data} {this.props.item.describeElement.filterDate.toLowerCase()}</h2>
                                  <Filters item={this.props.item} />
                                  {this.props.data.map((data)=>(
                                      <div key={`Pie${data.id}`}>
                                          {(data.id === this.props.item.id) ?
                                              <div>
                                                  <BarChart id={this.props.item.id}
                                                    axes
                                                    grid
                                                    colorBars
                                                    height={396}
                                                    width={500}
                                                    data={this.transformData(data.array)}
                                                    mouseOverHandler={this.mouseOverHandler}
                                                    mouseOutHandler={this.mouseOutHandler}
                                                    mouseMoveHandler={this.mouseMoveHandler}
                                                    />
                                                  <Legend data={this.transformData(data.array)} dataId={this.state.key} horizontal config={this.state.configComponent} />
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
                                  ))}
                              </div>
                          }
                      </div>
                      }
                  </div>
            ))}
        </div>  
    )
  }
}

const mapStateToProps = (state) => {
    //console.log("STATE",state);
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