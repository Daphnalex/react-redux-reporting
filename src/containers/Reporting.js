import React, { Component } from 'react';

import {Row,Col} from 'react-materialize';

import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import ArrayComponent from '../components/Array';


class ReportingList extends Component {
    
    constructor(props){
        super(props);
        ////console.log('props ReportingList',props.itemsReporting);
        this.state = {
            config: []
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
            default :
                return "year";
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

    componentDidMount(){
        ////console.log('DID MOUNT REPORTING')
      }  
    
      componentWillMount(){
        ////console.log('WILL MOUNT REPORTING');
        this.config = [];
        for(let i=0; i < 100; i++){
            var color = this.getRandomColor();
            ////console.log('récupérer la couleur',color);
            this.config = [...this.config, color];
        }
        this.setState({
            config: this.config
        })
        ////console.log('config constructor',this.config);
      }
    
      componentDidUpdate(){
          ////console.log('DID UPDATE REPORTING')
      }
    
      componentWillReceiveProps(nextProps){
          ////console.log('NEXTPROPS REPORTING',nextProps);
          
          
      }
    
    render(){
        const components = {
            PieChart: PieChart,
            BarChart: BarChart,
            ArrayComponent: ArrayComponent
            
        };
        //console.log('RENDER REPORTING DATA',this.props.data)
        return(
            <Row>
                {this.props.itemsReporting.length !== 0 ?
                    <Row>
                        {(this.props.data.length === 0)||(this.props.data === undefined) ?
                            <div>
                                Reporting en cours de chargement...
                            </div>
                            :
                            <div>
                                 {this.props.itemsReporting.map(item =>
                                    <Col className='elementReporting' key={item.id} s={12} m={12} l={6}>
                                        {React.createElement(components[`${item.graphFetch}`], {item: item, config: this.state.config, data: this.props.data.find((element)=>element.id===item.id), dataIsLoading: this.props.dataIsLoading.find((element) => element.id === item.id)} , null)}
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


export default ReportingList;