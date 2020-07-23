import React from 'react';

import Row from 'react-bootstrap/Row';

import HexValue from '../HexValue/HexValue';

class HexLine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: props.values,
        };
    }

    render() {
        return (
            <Row>
                { this.state.values.map( value => <HexValue value={value}/> ) }
            </Row>
        );
    }
}

export default HexLine;
