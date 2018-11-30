import React from 'react';
import PropTypes from 'prop-types';
import { Style } from 'radium';

const toolTipStyles = {
  '.tooltip': {
    border: 'solid silver 1px',
    position: 'fixed',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '10px'
  }
};

const ToolTip = (props) => (
   
  <div className="tooltip-container">
     {console.log('PROPS ICI',props)}
    <Style scopeSelector=".tooltip-container" rules={toolTipStyles} />
    <div className="tooltip" style={{ top: props.top, left: props.left }}>
        {props.value}
    </div>
  </div>
);


ToolTip.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number,
  key: PropTypes.string,
  value: PropTypes.number
};

export default ToolTip;