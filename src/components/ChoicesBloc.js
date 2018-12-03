import React, { Component } from "react";

import {Row, Col} from "react-materialize";

import RadioForm from "./RadioForm";
import ClassicalButton from "./ClassicalButton";

export default class ChoicesBloc extends Component {
    constructor(props){
        super(props);
        //console.log("props",props);
        //console.log("props function", props.addElementReportingAction)
        this.state = {
            choiceData: "",
            choiceGraph: ""
        }
    }

    handleChangeData = (data) => {
        //console.log("data",data);
        this.setState({
            choiceData: data
        })
    }

    handleChangeGraph = (graph) => {
        this.setState({
            choiceGraph: graph
        })
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

  validateChoices = (data, graph) => {
      var dataFetch = this.testDataChoice(data);
      var graphFetch = this.testGraphChoice(graph);
      const itemReporting = {
          dataFetch: dataFetch,
          graphFetch: graphFetch,
          filterDate: "year",
          filterScope: "global",
          id: Date.now(),
          describeElement: {
              data: data,
              graph: graph,
              filterDate: "Par année",
              filterScope: "Global"
          }
      }
      //console.log("itemReporting",itemReporting);
      this.props.addElementReporting(itemReporting);
      this.setState({
          choiceData: "",
          choiceGraph: ""
      });
      this.props.showAddingBloc();
  }

  checkedElement = (element) => {
      //console.log("element",element);
  }

  render() {
    return (
        <Row s={12} className="newBloc">
            <h3>Créer un nouveau bloc :</h3>
            <Col s={12} className="dataFilter">
                <h5>Données :</h5>
                {this.props.choicesData.map((data,i)=>(
                    <RadioForm onClickElement={()=>this.handleChangeData(data)} checkedElement={this.state.choiceData === data} key={i} keyBloc={2} element={data}/>
                ))}
            </Col>
            <br/>
            <Col s={12} className="graphFilter">
                <h5>Portée :</h5>
                {this.props.choicesGraph.map((graph,i)=>(
                  <RadioForm onClickElement={()=>this.handleChangeGraph(graph)} checkedElement={this.state.choiceGraph === graph} key={i} keyBloc={1} element={graph}/>
                ))}
            </Col>
            <Col s={12}>
                <ClassicalButton value="Générer" cssProp="center" onClickButton={()=>this.validateChoices(this.state.choiceData, this.state.choiceGraph)}/>
            </Col>
      </Row>
    )
  }
}
