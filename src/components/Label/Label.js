import React from 'react';
import './Label.css';

function getForegroundColor(bgColor) {
    var r = parseInt(bgColor.substr(0,2),16);
    var g = parseInt(bgColor.substr(2,2),16);
    var b = parseInt(bgColor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

export default function Label(props) {
  const { label } = props;
  const style = {
    color: getForegroundColor(label.color),
    backgroundColor: `#${label.color}`
  }
  
  return (
    <span className="Label" style={style}>
      { label.name }
    </span>
  )
}