import React, { Component } from 'react'

export default class RadioForm extends Component {

  onChangeElement(){
    console.log("le bouton change");
  }
    

  render() {
    return (
        <span className='selectChoiceElement' onClick={this.props.onClickElement}>
            <input type="radio" id={`form${this.props.keyBloc}` }
            onChange={this.onChangeElement} name={`form${this.props.keyBloc}` } value={this.props.element}
            checked={this.props.checkedElement}/>
            <label htmlFor={this.props.element}>
                {this.props.element}
            </label>
        </span>
    )
  }
}
