import React, { Component } from 'react';
import {PieChart} from 'react-easy-chart';

import ToolTip from './ToolTips';
import Legend from './Legend';
import config from '../config/base';
import Filters from './FiltersComponent';

import {apiFetchData, dataIsLoading, data, dataHasErrored} from '../actions/fetchActions';

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
        config: [],
        id: this.props.item.id
    }
    console.log('CONSTRUCTOR ID',this.state.id)
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

  componentDidMount(){
    var url = `${config.root}/${this.props.item.dataFetch}/${this.props.item.filterDate}`;
    var id = this.props.item.id;
    console.log('DID MOUNT')
    if (this.props.data.length === 0){
        this.props.apiFetchData(url, id);
    }
    for(let i=0;i<this.props.data.length;i++){
        console.log('boucle FOR')
        if (this.props.data[i].id === this.props.item.id){
            console.log('ILS SONT EGAUX');
            i = this.props.data.length;
        } else {
            console.log('PAS EGAUX')
            if (i === this.props.data.length - 1){
                console.log('DERNIER ELEMENT TESTE');
                this.props.apiFetchData(url, id);
            } else {
                console.log('I AUGMENTE');
                i++;
            }
        }
        
    }
    var data = this.props.data.filter((obj,pos,arr) =>{
        return arr.map(mapObj => mapObj[id]).indexOf(obj[id]) === pos;
    });
    console.log('DATA AFTER TRAITEMENT',data);
  }  

  componentDidUpdate(){
      console.log('DID UPDATE PIE');
  }


  transformData = (data) => {
      console.log('UPDATE',data);
      var data = data.map((item)=>{
            console.log('dans la boucle',item)
          return {key: item.id, value: item.result}
      })
      console.log('DATA TRANSFORME',data);
      return data;
  }

  mouseOverHandler = (d, e) => {
    //console.log('mouse over');
    //console.log('d',d);
    //console.log('e',e);
    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      value: d.value,
      key: d.data.key
    },function(){
        //console.log('post over',this.state.key)
    })
  }

  mouseMoveHandler = (d, e) => {
    //console.log('mouse move',e);
    //console.log("DDD",d)
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  mouseOutHandler = () => {
    //console.log('mouse Out');
    this.setState({showToolTip: false});
  }

  createTooltip = () => {
    //console.log("createTooltip function")
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
       console.log('data in render',this.props.data);
      return(
          <div>
            {(this.props.data.map((data)=> (
                <div key={data.id}>
                    {(data.id === this.props.item.id) ?
                        <div>
                            {data.id} =
                            {this.props.item.id} ?
                            {/* <h2>{this.props.item.describeElement.data} {this.props.item.describeElement.filterDate.toLowerCase()}</h2>
                            <Filters item={this.props.item} />
                            <PieChart id={this.props.item.id}
                            data={this.transformData(this.props.data.array)} 
                            innerHoleSize={200}
                            mouseOverHandler = {this.mouseOverHandler}
                            mouseOutHandler = {this.mouseOutHandler}
                            mouseMoveHandler = {this.mouseMoveHandler}
                            padding={10}
                            styles={this.styles}
                            />
                            <Legend data={this.transformData(this.props.data.array)} dataId={this.state.key} horizontal config={this.state.config} />
                            {(this.state.showToolTip) ?
                                <ToolTip
                                    top={this.state.top}
                                    left={this.state.left}
                                    title={this.state.key}
                                    value={this.state.value}
                                    />
                                :
                                <div></div>} */}
                          </div>
                        :
                          <div>Pas de composant portant cet identifiant</div>
                    }
                </div>
            )))}
          </div>  
      )
  }
}

const mapStateToProps = (state) => {
    console.log("STATE",state);
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiFetchData: (data,id) => {
            dispatch(apiFetchData(data,id));
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(PieChartComponent);

