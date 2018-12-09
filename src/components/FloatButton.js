import React, {Component} from "react";
import {Button} from 'react-materialize';

class FloatButton extends Component{


  render(){
    return(
      <Button onClick={this.props.onClickButton} floating large className='floatButton left' waves='light' icon={this.props.icon} />
    )
  }
}

export default FloatButton;
