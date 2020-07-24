import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './HexValue.css';

class HexValue extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editEnabled: true,
      hovered: false
    };

    this.index = props.index;

    this.mouseEnter = props.mouseEnter;
    this.mouseLeave = props.mouseLeave;    
  }
  
  valueUp = () => {
    this.setState( { value: this.state.value + 1 } );
  }
  
  valueDown = () => {
    this.setState( { value: this.state.value - 1 } );
  }
  
  toggleEditable = () => {
    var editEnabled = this.state.editEnabled ? false : true;
    this.setState({ editEnabled: editEnabled });
  }

  onMouseEnter = () => {
    // console.log( `value enter: index=${this.index} value=${this.state.value.toString(16)}` );
    this.setState( {
      hovered: true
    });
    this.mouseEnter( this.index );
  }

  onMouseLeave = () => {
    // console.log( `value leave: index=${this.index} value=${this.state.value.toString(16)}` );
    this.setState( {
      hovered: false
    });
    this.mouseLeave( this.index );
  }

  getClassName = () => {
    if( this.state.hovered === true ) {
      return "HoveredValue";
    }
    return "";
  }
  
  render() {
    return (
      <Col onMouseOver={ this.onMouseEnter } onMouseOut={ this.onMouseLeave } className={ this.getClassName() }>
        {/* <Button variant="danger" size="sm" disabled={this.state.editEnabled} onClick={ () => this.valueDown() }>🡓</Button> */}
        <span onClick={ () => this.toggleEditable() }>0x{this.state.value.toString(16)}</span>
        {/* <Button variant="success" size="sm" disabled={this.state.editEnabled} onClick={ () => this.valueUp() } >🡑</Button> */}
      </Col>
    );
  }
}
  
export default HexValue;
  