import React from 'react';
import PropTypes from 'prop-types';
import { Style } from 'radium';

const legendStyles = {
  '.legend': {
    border: 'solid silver 1px',
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '12px'
  },
  '.legend li': {
    display: 'inline-block',
    lineHeight: '24px',
    marginRight: '24px',
    marginBottom: '6px',
    paddingLeft: '18px',
    position: 'relative'
  },
  '.legend .icon': {
    width: '12px',
    height: '12px',
    background: 'red',
    borderRadius: '6px',
    position: 'absolute',
    left: '0',
    top: '50%',
    marginTop: '-6px'
  }
};


class Legend extends React.Component {


  getList() {
    console.log('this.props.data LEGEND',this.props.data)
    return (
      this.props.data.map(
        (item, index) => {
        return(
          <li key={index}>
            <span
              className="icon"
              style={{ backgroundColor: item.color }}
            />
            { item.key || item.x }
          </li>
        )}
      )
    );
  }

  render() {
    console.log("DANS LEGEND data",this.props.data)
    return (
      <div className="legend-container">
        <Style scopeSelector=".legend-container" rules={legendStyles} />
        <ul className="legend">{this.getList()}</ul>
      </div>
    );
  }
}

export default Legend;