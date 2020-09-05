import React, {useState} from 'react';

import './DataValue.css';

const DataValue = ({index, value, displayStyle, mouseEnter, mouseLeave, valueChanged}) => {
  const [hovered, setHovered] = useState(false);
  let className = hovered ? "ValueHovered " : "ValueNotHovered ";

  if( displayStyle === "ASCII" ) {
    className += "ValueAscii";
  }
  else if( displayStyle === "Hexadecimal" ) {
    className += "ValueHex";
  }
  else if( displayStyle === "Decimal" ) {
    className += "ValueDecimal";
  }
  
  const getDisplayValue = () => {
    if( displayStyle === "ASCII" ) {
      if( 32 <= value && value <= 126 ) {
        return String.fromCharCode(value);
      }
      else {
        return ".";
      }
    }
    else if( displayStyle === "Hexadecimal" ) {
      const minHex = Number(value).toString(16).toUpperCase();
      const finalHex = "00".substr(0, 2 - minHex.length) + minHex;
      return finalHex;
      // return `0x${ value.toString(16) }`;
    }
    else {
      return value;
    }
  }

  const onMouseEnter = () => {
    // console.log( `value enter: index=${this.index} value=${this.state.value.toString(16)}` );
    setHovered(true);
    mouseEnter(index);
  }

  const onMouseLeave = () => {
    // console.log( `value leave: index=${this.index} value=${this.state.value.toString(16)}` );
    setHovered(false);
    mouseLeave(index);
  }

  const handleInputChanged = (e) => {
    const newValue = e.target.value;
    const asDecimal = newValue.charCodeAt();
    console.dir(`Value change: index=[${index}] newValue=[${newValue}] asDecimal=[${asDecimal}]`);
    valueChanged(index, asDecimal);
  }

  return (
    <td onMouseOver={onMouseEnter} onMouseOut={onMouseLeave} className="Value">
      <input type="text" name="value" className={className} value={getDisplayValue()} onChange={handleInputChanged}/>
    </td>
  );
}

export default DataValue;
  