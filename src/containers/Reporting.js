import React, { Component } from 'react';

import {Row,Col} from 'react-materialize';

import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import ArrayComponent from '../components/Array';

class ReportingList extends Component {
    
    constructor(props){
        super(props);
        console.log('props ReportingList',props.itemsReporting);
    }

    testDataChoice = (data) => {
        switch(data){
            case "Connexions":
              return 'connexion';
            case "Licences actives":
              return 'license-active';
            default:
              return "";
        }
    }
  
    testGraphChoice = (graph) => {
      switch(graph){
          case "Camembert":
            return 'PieChart';
          case "Graphique en barre":
            return 'BarChart';
          case "Tableau":
            return "ArrayComponent";
          default:
            return "";
      }
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


    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    render(){
        const components = {
            PieChart: PieChart,
            BarChart: BarChart,
            ArrayComponent: ArrayComponent
            
        };
        return(
            <Row>
                {this.props.itemsReporting.length !== 0 ?
                    <Row>
                        {this.props.itemsReporting.map(item =>
                            <Col className='elementReporting' key={item.id} s={12} m={12} l={6}>
                                {console.log('REPORTING', item)}
                                {React.createElement(components[`${this.testGraphChoice(item.graph)}`], {item: item, testFilterDate: this.testFilterDate, testDataChoice: this.testDataChoice, getRandomColor: this.getRandomColor} , null)}
                            </Col>
                        )}
                    </Row>
                    :
                    <Row>Pas d'éléments à afficher</Row>
                }
            </Row>
        )
    }
    
}
export default ReportingList;