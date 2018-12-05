import React, { Component } from 'react';

import {Row,Col} from 'react-materialize';

import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import ArrayComponent from '../components/Array';

import {connect} from 'react-redux';

class ReportingList extends Component {
    
    constructor(props){
        super(props);
        //console.log('props ReportingList',props.itemsReporting);
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
                    <Row>{this.props.dataIsLoading ?
                        <div>Chargement des données...</div>
                    :
                        <div>
                            {this.props.itemsReporting.map(item =>
                                <Col className='elementReporting' key={item.id} s={12} m={12} l={6}>
                                    {React.createElement(components[`${item.graphFetch}`], {item: item, getRandomColor: this.getRandomColor} , null)}
                                </Col>
                            )}
                        </div>
                    }
                        
                    </Row>
                    :
                    <Row>Pas d'éléments à afficher</Row>
                }
            </Row>
        )
    }
    
}

const mapStateToProps = (state) => {
    console.log("STATE",state);
    return {
        dataIsLoading: state.dataIsLoading
    }
}

export default connect(mapStateToProps) (ReportingList);