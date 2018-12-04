import React, { Component } from 'react'
import RadioForm from './RadioForm';
import ClassicalButton from './ClassicalButton';
import config from '../config/base.js';

import {Row, Col} from 'react-materialize';

import {updateElementReportingAction} from '../actions/itemsActions';
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
    //console.log('this.props.item dans FILTERS',this.props.item);
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
    const itemReporting = {
      url: `${config.root}/${this.props.item.dataFetch}/${this.testFilterDate(date)}`,
      dataFetch: this.props.item.dataFetch,
      graphFetch: this.props.item.graphFetch,
      filterDate: this.testFilterDate(date),
      filterScope: this.props.item.filterScope,
      id: Date.now(),
      describeElement: {
          data: this.props.item.describeElement.data,
          graph: this.props.item.describeElement.graph,
          filterDate: date,
          filterScope: this.props.item.describeElement.filterScope
      }
    }
    this.props.updateElementReporting(itemReporting);
  }



  render() {
    
    return (
      <Row className='filter'>
        <h5>Filter ce composant par :</h5>
        <Col s={12} className="dateFilter">
          <h6>Date :</h6>
          {this.state.choicesDate.map((date,i)=>(
            <RadioForm onClickElement={()=>this.handleChangeDate(date)} checkedElement={this.props.item.describeElement.filterDate === date} key={i} keyBloc={2} element={date}/>
          ))}  
        </Col>
        <br/>
        <Col s={12} className="scopeFilter">
          <h6>Portée :</h6>
          {this.state.choicesScope.map((scope,i)=>(
            <RadioForm onClickElement={()=>this.handleChangeGraph(scope)} checkedElement={this.props.item.describeElement.filterScope === scope} key={i} keyBloc={1} element={scope}/>
          ))}
        </Col>
      </Row>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  //console.log('dispatch',dispatch)
  return {
    updateElementReporting: (elementReporting) => {
      dispatch(updateElementReportingAction(elementReporting));
    }
  }
}

export default connect(undefined,mapDispatchToProps) (Filters);