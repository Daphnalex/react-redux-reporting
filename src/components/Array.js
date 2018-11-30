import React, { Component } from 'react'

import config from '../config/base';

export default class ArrayComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
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
              const data = json.map((item) => { console.log('ITEM ARRAY',item)})
          }
      })
      .catch(error => console.log('error', error));
  }

  render() {
      console.log('item',this.state.item)
    return (
      <div>
        
      </div>
    )
  }
}
