import React, { Component } from 'react'

import config from '../config/base';

export default class ArrayComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
          loading: true,
          item: this.props.item,
          data: []
      }
  }

  componentDidMount(){
      fetch(`${config.root}/${this.props.testDataChoice(this.state.item.data)}/${this.props.testFilterDate(this.props.item.filterDate)}`,{
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
      })
      .then(res => res.json())
      .then(json => {
          if(json){
              const data = json.map((item) => { return {name: item.id, value: item.result} })
              //console.log("DATA JSON",data);
              this.setState({data: data, loading: false});
          }
      })
      .catch(error => console.log('error', error));
  }

  render() {
      //console.log('item',this.state.item)
    return (
      <div>
        {(this.loading) ?
            <div></div>
            :
            <div>
                <h2>{this.state.item.data} {this.state.item.filterDate.toLowerCase()}</h2>
                
                <table className='arrayComponent'>
                    <thead>
                    <tr>
                        <th>{this.state.item.filterDate}</th>
                        <th>Valeur</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.data.map((item,i)=>(
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>}
      </div>
    )
  }
}
