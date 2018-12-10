import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';
import ToolTip from './ToolTips';
import Legend from './Legend';
import Filters from './FiltersComponent';


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
        })
    }

    componentWillMount() {
        var color = '';
        var config = []
        for (let i = 0; i < 100; i++) {
            color = this.props.getRandomColor();
            //console.log('color dans will mount', color);
            config.push(color);
            this.setState({
                config: config
            }, function () {
                //console.log('this.state.config', this.state.config);
            })
        }

    }



    transformData = (data, message) => {
        var newData = data.map((item, i) => {
            return { x: this.props.formatDate(item.id), y: item.result, color: '' }
        });
        var newMessage;
        if (this.state.dataIsLoading) {
            //console.log('NEWDATA AVANT TRANSFORMATION', newData);
            if ((this.state.item.filterDate === "day") && (newData.length > 30)) {
                //limit the table to the 30 last days
                newData = newData.slice(data.length - 30, data.length);
                //console.log('newData with filter day', newData);
                newData.map((item, i) => {
                    item.color = this.state.config[i]
                });
                newMessage = "les 30 derniers jours";
            } else if ((this.state.item.filterDate === "month") && (newData.length > 12)) {
                //limit the table to the 12 last month
                newData = newData.slice(data.length - 12, data.length);
                //console.log('newData with filter month', newData);
                newData.map((item, i) => {
                    item.color = this.state.config[i]
                });
                newMessage = "les 12 derniers mois";
            } else if ((this.state.item.filterDate === "year") && (newData.length > 10)) {
                //limit the table to the 10 last years
                newData = newData.slice(data.length - 10, data.length);
                newData.map((item, i) => {
                    item.color = this.state.config[i]
                });
                //console.log('newData with filter years', newData);
                newMessage = "les 10 dernières années";
            } else {
                newData.map((item, i) => {
                    item.color = this.state.config[i];
                })
            }
        }

        if (message !== newMessage) {
            this.setState({ message: newMessage })
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
            <div>
                {this.state.dataIsLoading.bool ?
                    <div>
                        Donnée en cours de chargement
                </div>
                    :
                    <div>
                        <h2>{this.state.item.describeElement.data} {this.state.item.describeElement.filterDate.toLowerCase()} ({this.state.item.describeElement.graph})</h2>
                        <Filters item={this.state.item} />
                        <div key={`Pie${this.state.data.id}`}>
                            {(this.state.data.id === this.state.item.id) ?
                                <div>
                                    <BarChart id={this.state.item.id}
                                        axes
                                        grid
                                        colorBars
                                        height={396}
                                        width={500}
                                        data={this.transformData(this.state.data.array, this.state.message)}
                                        mouseOverHandler={this.mouseOverHandler}
                                        mouseOutHandler={this.mouseOutHandler}
                                        mouseMoveHandler={this.mouseMoveHandler}
                                    />
                                    <p className='legend'>{this.state.message}</p>
                                    <Legend data={this.transformData(this.state.data.array, this.state.message)} dataId={this.state.key} horizontal config={this.state.config} />
                                    {(this.state.showToolTip) ?
                                        <ToolTip
                                            top={this.state.top}
                                            left={this.state.left}
                                            title={this.state.x}
                                            value={this.state.y}
                                        />
                                        :
                                        <div></div>}
                                </div>
                                :
                                <div>Donnée non trouvée</div>
                            }
                        </div>
                    </div>
                }
            </div>
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