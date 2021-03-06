import React, { Component } from 'react'
import RadioForm from './RadioForm';
import config from '../config/base.js';

import {Row, Col} from 'react-materialize';

import {updateElementReportingAction} from '../actions/itemsActions';
import {apiFetchData} from '../actions/fetchActions';
import {connect} from 'react-redux';

class Filters extends Component {
  constructor(props){
    super(props);
    this.state={
      showSpecificFilterBloc: false,
      choicesDate: ["Par année","Par mois", "Par jour"],
      choicesScope: ["Global", "Par client", "Par site", "Par équipe"],
      loadComponent: false
    }
    ////console.log('this.props.item dans FILTERS',this.props.item);
  }

  componentDidMount(){
    if (this.props.item.dataFetch === 'license-active'){
      this.setState({
        choicesDate: ["Par année","Par mois"]
      })
    }
  }
  componentWillReceiveProps(nextProps){
    ////console.log('NEXTPROPS filters',nextProps); 
  }
  

  testFilterDate = (date) => {
    //not date filter for license-active
    if (this.props.item.dataFetch === 'license-active'){
      switch(date){
        case "Par année":
          return "year";
        case "Par mois":
          return "month";
        default:
          return "year";
      }
    } else {
      switch(date){
        case "Par année":
          return "year";
        case "Par mois":
          return "month";
        case "Par jour":
          return "day";
        default: 
          return "year";
      }
    }
    
  }

  testFilterScope = (scope) => {
    switch(scope){
      case 'Global':
        return 'global';
      case "Par client":
        return "client";
      case "Par site":
        return "site";
      case "Par équipe":
        return "team";
      default:
        return "global";
    }
  }

  handleChangeDate = (date) => {
  ////console.log('ITEM avant changement',this.props.item)
    console.log('nouvelle date',date)
    var itemReporting = {
      url: `${config.root}/${this.props.item.dataFetch}/${this.testFilterDate(date)}`,
      dataFetch: this.props.item.dataFetch,
      graphFetch: this.props.item.graphFetch,
      filterDate: this.testFilterDate(date),
      filterScope: this.props.item.filterScope,
      id: this.props.item.id,
      describeElement: {
          data: this.props.item.describeElement.data,
          graph: this.props.item.describeElement.graph,
          filterDate: date,
          filterScope: this.props.item.describeElement.filterScope
      }
    }
    console.log('ITEM après changement',itemReporting)
    this.props.updateElementReporting(itemReporting);
    this.props.apiFetchData(itemReporting.url,this.props.item.id,this.props.item.filterScope);
  }

  handleChangeScope = (scope) => {
    console.log('nouveau scope',scope)
    var itemReporting = {
      url: `${config.root}/${this.props.item.dataFetch}/${this.props.item.filterDate}`,
      dataFetch: this.props.item.dataFetch,
      graphFetch: this.props.item.graphFetch,
      filterDate: this.props.item.filterDate,
      filterScope: this.testFilterScope(scope),
      id: this.props.item.id,
      describeElement: {
          data: this.props.item.describeElement.data,
          graph: this.props.item.describeElement.graph,
          filterDate: this.props.item.describeElement.filterDate,
          filterScope: scope
      }
    }
    this.props.updateElementReporting(itemReporting);
    this.props.apiFetchData(itemReporting.url, this.props.item.id,itemReporting.filterScope);
  }



  render() {
    ////console.log('ITEM dans filtres',this.props.item)
    return (
      <Row className='filter'>
        <h5>Filter ce composant par :</h5>
        <Col s={12} className="dateFilter">
          <h6>Date :</h6>
          {this.state.choicesDate.map((date,i)=>(
            <RadioForm onClickElement={()=>this.handleChangeDate(date)} checkedElement={this.props.item.describeElement.filterDate === date} key={`${this.props.item.id}date${i}`} keyBloc={`date${this.props.item.id}`} element={date}/>
          ))} 
        </Col>
        <br/>
        <Col s={12} className="scopeFilter">
          <h6>Portée :</h6>
          {this.state.choicesScope.map((scope,i)=>(
            <RadioForm onClickElement={()=>this.handleChangeScope(scope)} checkedElement={this.props.item.describeElement.filterScope === scope} key={`${this.props.item.id}scope${i}`} keyBloc={`scope${this.props.item.id}`} element={scope}/>
          ))}
        </Col>
      </Row>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  ////console.log('dispatch',dispatch)
  return {
    updateElementReporting: (elementReporting) => {
      dispatch(updateElementReportingAction(elementReporting));
    },
    apiFetchData: (data,id,scope) => {
      dispatch(apiFetchData(data,id,scope));
    }
  }
}

export default connect(undefined,mapDispatchToProps) (Filters);