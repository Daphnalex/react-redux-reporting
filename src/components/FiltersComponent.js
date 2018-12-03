import React, { Component } from 'react'
import RadioForm from './RadioForm';
import ClassicalButton from './ClassicalButton';
import config from '../config/base.js';



import {Row, Col} from 'react-materialize';

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

  handleChangeDate = (date) => {
    console.log('dans la vue on change de date ',date);
    this.setState({loadComponent: true});
    this.props.setDateFilter(date);
  }



  render() {
    console.log('FILTERS COMPONENTS', this.props.filters)
    if (this.props.filters.dateFilter !=='') {
      this.updateDateFilter()
    };
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




export default Filters;