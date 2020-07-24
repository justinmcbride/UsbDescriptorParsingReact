import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './HexValue.css';

class HexValue extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editVisible: true
    };

    this.index = props.index;

    this.mouseEnter = props.mouseEnter;
    this.mouseLeave = props.mouseLeave;    
  }
  
  valueUp() {
    this.setState( { value: this.state.value + 1 } );
  }
  
  valueDown() {
    this.setState( { value: this.state.value - 1 } );
  }
  
  changeVisibility() {
    var editVisible = this.state.editVisible ? false : true;
    this.setState({ editVisible: editVisible });
  }

  onMouseEnter() {
    console.log( `value enter: index=${this.index}` );
    this.mouseEnter( this.index );
  }

  onMouseLeave() {
    console.log( `value leave: index=${this.index}` );
    this.mouseLeave( this.index );
  }
  
  render() {
    return (
      <Col onMouseEnter={ () => this.onMouseEnter() } onMouseLeave={ () => this.onMouseLeave() }>
        <Button variant="danger" size="sm" disabled={this.state.editVisible} onClick={ () => this.valueDown() }>🡓</Button>
        <span onClick={ () => this.changeVisibility() }>0x{this.state.value.toString(16)}</span>
        <Button variant="success" size="sm" disabled={this.state.editVisible} onClick={ () => this.valueUp() } >🡑</Button>
      </Col>
    );
  }
}
  
export default HexValue;
  