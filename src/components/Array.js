import React, { Component } from 'react'

import Filters from "./FiltersComponent";

import { Row, Col } from 'react-materialize';

export default class ArrayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            dataIsLoading: this.props.dataIsLoading,
            item: this.props.item,
            message: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataIsLoading: nextProps.dataIsLoading,
            data: this.transformData(nextProps.data),
            item: nextProps.item,
        });
        this.testMessage(nextProps.item.filterDate);
        this.transformData(nextProps.data);
    }

    componentWillMount() {
        this.testMessage(this.props.item.filterDate);
    }



    testMessage(date) {
        if (date === "day") {
            this.setState({
                message: 'les 30 derniers jours (maximum)'
            })
        } else if (date === "month") {
            this.setState({
                message: 'les 12 derniers mois (maximum)'
            })
        } else {
            this.setState({
                message: 'les 10 dernières années (maximum)'
            })
        }
    }

    transformData = (data, message) => {
        if (this.props.dataIsLoading) {
            var newData = [];
            if (this.state.item.filterScope === 'global') {
                newData = data.array.map((item, i) => {
                    return { name: item.name, key: this.props.formatDate(item.id), value: item.result, color: '' }
                });
            } else {
                newData = data.array.map((item, i) => {
                    return item.map((element) => {
                        return { name: element.name, key: this.props.formatDate(element.id), value: element.result, color: '' }

                    })
                });
            }
            //test if newData is a array of array or array of object
            if (typeof (newData[0].length) === 'undefined') {
                if (this.state.item.filterDate === "day") {
                    newData = newData.slice(newData.length - 30, newData.length);
                } else if (this.state.item.filterDate === "month") {
                    newData = newData.slice(newData.length - 12, newData.length);
                } else {
                    newData = newData.slice(newData.length - 10, newData.length);
                }

            } else {
                if (this.state.item.filterDate === "day") {
                    return newData.map((item) => {
                        item = item.slice(item.length - 30, item.length);
                        return item;
                    })
                } else if (this.state.item.filterDate === "month") {
                    return newData.map((item) => {
                        item = item.slice(item.length - 12, item.length);
                        return item;
                    })
                } else if (this.state.item.filterDate === "year") {
                    return newData.map((item) => {
                        item = item.slice(item.length - 10, item.length);
                        return item;
                    });
                }
            }
        }
        return newData;
    }

    render() {
        return (
            <Row>
                {this.state.dataIsLoading.bool ?
                    <Row>
                        Donnée en cours de chargement
                     </Row>
                    :
                    <Row>
                        <h2>{this.state.item.describeElement.data} {this.state.item.describeElement.filterDate.toLowerCase()} ({this.state.item.describeElement.graph})</h2>
                        <Filters item={this.state.item} />
                        {this.state.item.filterScope === 'global' ?
                            <Row>
                                {(this.props.data.id === this.state.item.id) ?
                                    <Col l={6}>
                                        <p className='legend'>{this.state.message}</p>
                                        <table className='arrayComponent'>
                                            <thead>
                                                <tr>
                                                    <th>{this.state.item.describeElement.filterDate}</th>
                                                    <th>Valeur</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {this.state.data.map((item, i) => (
                                                    <tr key={i}>
                                                        <td>{item.key}</td>
                                                        <td>{item.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Col>
                                    :
                                    <Row>Donnée non trouvée</Row>
                                }
                            </Row>
                            :
                            <Row>
                                {this.state.data.map((item) => (
                                    <Col l={6} key={`Pie-${this.props.data.id}${item[0].name}`}>
                                        <p className='legend'>{item[0].name}</p>
                                        <p className='legend'>{this.state.message}</p>
                                        <table className='arrayComponent'>
                                            <thead>
                                                <tr>
                                                    <th>{this.state.item.describeElement.filterDate}</th>
                                                    <th>Valeur</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {item.map((element, i) => (
                                                    <tr key={i}>
                                                        <td>{element.key}</td>
                                                        <td>{element.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Col>
                                ))}
                            </Row>
                        }

                    </Row>
                }
            </Row>
        )
    }
}
