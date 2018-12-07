import React, { Component } from 'react'

import {Row, Col} from "react-materialize";

import ClassicalButton from '../components/ClassicalButton';
import FloatButton from '../components/FloatButton';
import ChoicesBloc from '../components/ChoicesBloc';
import Reporting from './Reporting';

import { connect } from 'react-redux';
import { addElementReportingAction } from '../actions/itemsActions';

class Home extends Component {

  state = {
     showAddingBloc: false,
     choicesData: ["Connexions","Licences actives"],
     choicesGraph: ["Camembert", "Graphique en barre", "Tableau"],
     itemsReporting: []
  }

  onClickButton = () =>{
      //console.log('button clic');
      this.setState({
          showAddingBloc: !this.state.showAddingBloc
      })
  }

  componentDidMount(){
    console.log('DID MOUNT HOME')
  }  

  componentWillMount(){
      console.log('WILL MOUNT HOME')
  }

  componentDidUpdate(){
      console.log('DID UPDATE HOME')
  }

  componentWillReceiveProps(nextProps){
      console.log('NEXTPROPS HOME',nextProps);
      
      
  }

  render() {
      console.log('ITEMS HOME',this.props.itemsReporting)
    return (
        <Row className="homePage">
            <Row className="titleHome">
                <h1><span className="bigTitle">Reporting</span><br/>Phone Booster</h1>
            </Row>
            <hr className="bigHr"/>
            <Col s={12} m={12} l={12} className="reportingContent">
                {(this.state.showAddingBloc === true) ?
                    <Row>
                        <Col s={12}>
                            <ClassicalButton cssProp='left' onClickButton={this.onClickButton} value="annuler" />
                        </Col>
                        <Col s={12}>
                            <ChoicesBloc showAddingBloc={this.onClickButton} choicesData={this.state.choicesData} choicesGraph={this.state.choicesGraph} addElementReporting={this.props.addElementReporting}/>
                    </Col>
                </Row>    
                :
                    <FloatButton icon="add" onClickButton={this.onClickButton} />
                }
            </Col>
            <Col s={12} m={12} l={12}>
                <Reporting itemsReporting={this.props.itemsReporting} />
            </Col>
        </Row>
    )
  }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps',state);
    return({
        itemsReporting: state.itemsReporting
    })
}

const mapDispatchToProps = (dispatch) => {
    //console.log('dispatch',dispatch)
    return {
        addElementReporting: (elementReporting) => {
            dispatch(addElementReportingAction(elementReporting));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);
