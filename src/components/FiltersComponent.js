import React, { Component } from 'react'
import RadioForm from './RadioForm';
import ClassicalButton from './ClassicalButton';
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

  componentWillReceiveProps(nextProps){
    ////console.log('NEXTPROPS filters',nextProps); 
  }

  testFilterDate = (date) => {
    switch(date){
      case "Par année":
        return "year";
      case "Par mois":
        return "month";
      case "Par jour":
        return "day";
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
    this.props.apiFetchData(itemReporting.url,this.props.item.id);
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
            <RadioForm onClickElement={()=>this.handleChangeGraph(scope)} checkedElement={this.props.item.describeElement.filterScope === scope} key={`${this.props.item.id}scope${i}`} keyBloc={`scope${this.props.item.id}`} element={scope}/>
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
    apiFetchData: (data,id) => {
      dispatch(apiFetchData(data,id));
    }
  }
}

export default connect(undefined,mapDispatchToProps) (Filters);