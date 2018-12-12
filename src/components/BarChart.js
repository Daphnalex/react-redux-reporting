import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';
import ToolTip from './ToolTips';
import Legend from './Legend';
import Filters from './FiltersComponent';

import {Row, Col} from "react-materialize";

import { connect } from 'react-redux';

import { apiFetchData } from '../actions/fetchActions';

class BarChartComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            showToolTip: false,
            top: 0,
            left: 0,
            x: '',
            y: 0,
            config: [],
            data: this.props.data,
            dataIsLoading: this.props.dataIsLoading,
            item: this.props.item,
            message: ""
        }
        this.mouseOverHandler = this.mouseOverHandler.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        //console.log('nextProps de Pie', nextProps);
        this.setState({
            dataIsLoading: nextProps.dataIsLoading,
            data: nextProps.data,
            item: nextProps.item
        });
        this.testMessage(nextProps.item.filterDate);
    }

    componentWillMount() {
        var color = '';
        var config = []
        for (let i = 0; i < 100; i++) {
            color = this.props.getRandomColor();
            config.push(color);
            this.setState({
                config: config
            })
        }
        this.testMessage(this.props.item.filterDate);
    }



    testMessage(date) {
        console.log('date testmessage', date)
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
        if (this.state.item.filterScope === 'global') {
            var newData = data.array.map((item, i) => {
                return { name: item.name, x: this.props.formatDate(item.id), y: item.result, color: '' }
            });
        } else {
            var newData = data.map((item, i) => {
                return { name: item.name, x: this.props.formatDate(item.id), y: item.result, color: '' }
            });
        }

        if (this.state.dataIsLoading) {
            if ((this.state.item.filterDate === "day") && (newData.length > 30)) {
                newData = newData.slice(newData.length - 30, newData.length);
                newData.map((item, i) => {
                    item.color = this.state.config[i]
                });
            } else if ((this.state.item.filterDate === "month") && (newData.length > 12)) {
                newData = newData.slice(newData.length - 12, newData.length);
                newData.map((item, i) => {
                    item.color = this.state.config[i]
                });
            } else if ((this.state.item.filterDate === "year") && (newData.length > 10)) {
                newData = newData.slice(newData.length - 10, newData.length);
                newData.map((item, i) => {
                    item.color = this.state.config[i]
                });
            } else {
                newData.map((item, i) => {
                    item.color = this.state.config[i];
                })
            }
        }
        return newData;
    }


    mouseOverHandler(d, e) {
        this.setState({
            showToolTip: true,
            top: e.y,
            left: e.x,
            y: d.y,
            x: d.x
        });
    }

    mouseMoveHandler(d, e) {
        if (this.state.showToolTip) {
            this.setState({ top: e.y, left: e.x });
        }
    }

    mouseOutHandler() {
        this.setState({ showToolTip: false });
    }

    render() {
        //console.log('data props dans render Pie',this.props.data);
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
                                {(this.state.data.id === this.state.item.id) ?
                                    <Col l={6}>
                                        <BarChart id={this.state.item.id}
                                            axes
                                            grid
                                            colorBars
                                            height={396}
                                            width={500}
                                            data={this.transformData(this.state.data, this.state.message)}
                                            mouseOverHandler={this.mouseOverHandler}
                                            mouseOutHandler={this.mouseOutHandler}
                                            mouseMoveHandler={this.mouseMoveHandler}
                                        />
                                        <p className='legend'>{this.state.message}</p>
                                        <Legend data={this.transformData(this.state.data, this.state.message)} dataId={this.state.key} horizontal config={this.state.config} />
                                        {(this.state.showToolTip) &&
                                            <ToolTip
                                                top={this.state.top}
                                                left={this.state.left}
                                                title={this.state.x}
                                                value={this.state.y}
                                            />
                                        }
                                    </Col>
                                    :
                                    <Row>Donnée non trouvée</Row>
                                }
                            </Row>
                            :
                            <Row>
                                {this.state.data.array.map((item) => (
                                    <Col l={6} key={`Pie-${this.state.data.id}${item[0].name}`}>
                                        <BarChart id={item.id}
                                            axes
                                            grid
                                            colorBars
                                            height={396}
                                            width={500}
                                            data={this.transformData(item, this.state.message)}
                                            mouseOverHandler={this.mouseOverHandler}
                                            mouseOutHandler={this.mouseOutHandler}
                                            mouseMoveHandler={this.mouseMoveHandler}
                                        />
                                        <p className='legend'>{item[0].name}</p>
                                        <p className='legend'>{this.state.message}</p>
                                        <Legend data={this.transformData(item, this.state.message)} dataId={this.state.key} horizontal config={this.state.config} />
                                        {(this.state.showToolTip) &&
                                            <ToolTip
                                                top={this.state.top}
                                                left={this.state.left}
                                                title={this.state.x}
                                                value={this.state.y}
                                            />
                                        }
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

const mapDispatchToProps = (dispatch) => {
    return {
        apiFetchData: (data, id) => {
            dispatch(apiFetchData(data, id));
        }
    }
}

export default connect(undefined, mapDispatchToProps)(BarChartComponent);