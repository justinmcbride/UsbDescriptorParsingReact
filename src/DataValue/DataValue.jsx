import React from 'react';

import Col from 'react-bootstrap/Col';

import './DataValue.css';

class DataValue extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editEnabled: true
    };
  }

  render() {
    return (
      <Col onMouseOver={ this.onMouseEnter } onMouseOut={ this.onMouseLeave } className={ this.getClassName() }>
        {/* <Button variant="danger" size="sm" disabled={this.state.editEnabled} onClick={ () => this.valueDown() }>🡓</Button> */}
        <span onClick={ () => this.toggleEditable() }>{ this.getDisplayValue() }</span>
        {/* <Button variant="success" size="sm" disabled={this.state.editEnabled} onClick={ () => this.valueUp() } >🡑</Button> */}
      </Col>
    );
  }

  getDisplayValue() {
    if( this.props.style == "hex" ) {
      return `0x${ this.props.value.toString(16) }`;
    }
    else if ( this.props.style == "ascii" ) {
      const value = this.props.value;
      if( 32 <= value && value <= 126 ) {
        return String.fromCharCode( value );
      }
      else {
        return ".";
      }
    }
    else {
      return `${ this.props.value }`;
    }
  }

  onMouseEnter = () => {
    // console.log( `value enter: index=${this.index} value=${this.state.value.toString(16)}` );
    this.props.mouseEnter( this.props.index );
  }

  onMouseLeave = () => {
    // console.log( `value leave: index=${this.index} value=${this.state.value.toString(16)}` );
    this.props.mouseLeave( this.props.index );
  }

  getClassName = () => {
    if( this.props.hovered ) {
      return "Value ValueHovered";
    }
    return "Value ValueNotHovered";
  }

  valueUp = () => {
    this.props.valueChanged( this.props.value + 1 );
  }
  
  valueDown = () => {
    this.props.valueChanged( this.props.value + 1 );
  }
  
  toggleEditable = () => {
    this.setState({
      editEnabled: !this.state.editEnabled
    });
  }
}
  
export default DataValue;
  