import React, {Component} from "react";
import {Button} from 'react-materialize';

class ClassicalButton extends Component{
  

  render(){
    return(
      <Button waves='light' className={`floatButton ${this.props.cssProp}`} onClick={this.props.onClickButton}>{this.props.value}</Button>
    )
  }
}

export default ClassicalButton;
