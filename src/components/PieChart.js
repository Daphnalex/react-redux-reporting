import React, { Component } from 'react';
import { PieChart } from 'react-easy-chart';

import ToolTip from './ToolTips';
import Legend from './Legend';
import Filters from './FiltersComponent';

import { func } from 'prop-types';

class PieChartComponent extends Component {

  constructor(props) {

    super(props);

    this.state = {
      showToolTip: false,
      top: 0,
      left: 0,
      value: 0,
      key: "",
      id: this.props.item.id,
      config: [],
      data: this.props.data,
      dataIsLoading: this.props.dataIsLoading,
      item: this.props.item,
      message: ""
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

  componentWillReceiveProps(nextProps) {
    //console.log('nextProps de Pie',nextProps);
    this.setState({
      dataIsLoading: nextProps.dataIsLoading,
      data: nextProps.data,
      item: nextProps.item
    })
  }

  componentWillMount() {
    var color = '';
    var config = []
    for (let i = 0; i < 100; i++) {
      color = this.props.getRandomColor();
      //console.log('color dans will mount',color);
      config.push(color);
      this.setState({
        config: config
      }, function () {
        //console.log('this.state.config',this.state.config);
      })
    }

  }

  transformData = (data) => {
    if(this.state.item.filterScope === 'global'){
      var newData = data.array.map((item, i) => {
        console.log('item dans transformData', item)
        return { name: item.name, key: this.props.formatDate(item.id), value: item.result, color: '' }
      });
    } else {
      var newData = data.map((item, i) => {
        console.log('item dans transformData', item)
        return { name: item.name, key: this.props.formatDate(item.id), value: item.result, color: '' }
      });
    }

    if (this.state.dataIsLoading) {
      console.log('NEWDATA AVANT TRANSFORMATION',newData);
      if ((this.state.item.filterDate === "day") && (newData.length > 30)) {
        //limit the table to the 30 last days
        newData = newData.slice(data.length - 30, data.length);
        //console.log('newData with filter day',newData);
        newData.map((item, i) => {
          item.color = this.state.config[i]
        });
        // this.setState({message:  "les 30 derniers jours"})
      } else if ((this.state.item.filterDate === "month") && (newData.length > 12)) {
        //limit the table to the 12 last month
        newData = newData.slice(data.length - 12, data.length);
        //console.log('newData with filter month',newData);
        newData.map((item, i) => {
          item.color = this.state.config[i]
        });
        // this.setState({message:  "les 12 derniers mois"});
      } else if ((this.state.item.filterDate === "year") && (newData.length > 10)) {
        //limit the table to the 10 last years
        newData = newData.slice(data.length - 10, data.length);
        newData.map((item, i) => {
          item.color = this.state.config[i]
        });
        //console.log('newData with filter years',newData);)
        // this.setState({message:  "les 10 dernières années"})
      } else {
        newData.map((item, i) => {
          item.color = this.state.config[i];
        })
      }
    }

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
      this.setState({ top: e.y, left: e.x });
    }
  }

  mouseOutHandler = () => {
    this.setState({ showToolTip: false });
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
    //console.log('data props dans render Pie',this.state);


    return (
      <div>
        {this.state.dataIsLoading.bool ?
          <div>
            Donnée en cours de chargement
                </div>
          :
          <div>
            <h2>{this.state.item.describeElement.data} {this.state.item.describeElement.filterDate.toLowerCase()} ({this.state.item.describeElement.graph})</h2>
            <Filters item={this.state.item} />
            {this.state.item.filterScope === 'global' ?
              <div key={`Pie${this.state.data.id}`}>
                {(this.state.data.id === this.state.item.id) ?
                  <div>
                    <PieChart id={this.state.item.id}
                      data={this.transformData(this.state.data)}
                      innerHoleSize={200}
                      mouseOverHandler={this.mouseOverHandler}
                      mouseOutHandler={this.mouseOutHandler}
                      mouseMoveHandler={this.mouseMoveHandler}
                      padding={10}
                      styles={this.styles}
                    />
                    {/* <p class='legend'>{this.state.message}</p> */}
                    <Legend data={this.transformData(this.state.data)} dataId={this.state.key} horizontal config={this.state.config} />
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
              :
              <div>
                {this.state.data.array.map((item) => (
                  <div>
                    <PieChart id={item.id}
                      data={this.transformData(item, this.state.message)}
                      innerHoleSize={200}
                      mouseOverHandler={this.mouseOverHandler}
                      mouseOutHandler={this.mouseOutHandler}
                      mouseMoveHandler={this.mouseMoveHandler}
                      padding={10}
                      styles={this.styles}
                    />
                    <p class='legend'>{item[0].name}</p>
                    <Legend data={this.transformData(item, this.state.message)} dataId={this.state.key} horizontal config={this.state.config} />
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
                ))}
              </div>
            }

          </div>
        }
      </div>
    )
  }
}


export default PieChartComponent;

