import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './HexValue.css';

class HexValue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    valueUp() {
        this.setState( { value: this.state.value + 1 } );
    }

    valueDown() {
        this.setState( { value: this.state.value - 1 } );
    }

    render() {
        return (
            <Col>
                <Button variant="danger" size="sm" onClick={ () => this.valueDown() }>🡓</Button>
                0x{this.state.value.toString(16)}
                <Button variant="success" size="sm" onClick={ () => this.valueUp() } >🡑</Button>
            </Col>
        );
    }
}

export default HexValue;
