import React from "react";

import SvgIcon from "material-ui/SvgIcon";

var SharpSvg = function SharpSvg(props) {
  props = Object.assign({}, props, {viewBox:"0 0 1.1 3.0000001", width:"6.8493137", height:"18.679947"});
  return React.createElement(
    SvgIcon,
    props,
    React.createElement('path', { transform: "matrix(0.004,0,0,-0.004,0,1.5)",
     d: "m 216,-312 c 0,-10 -8,-19 -18,-19 -10,0 -19,9 -19,19 v 145 l -83,-31 v -158 c 0,-10 -9,-19 -19,-19 -10,0 -18,9 -18,19 v 145 l -32,-12 c -2,-1 -5,-1 -7,-1 -11,0 -20,9 -20,20 v 60 c 0,8 5,16 13,19 l 46,16 V 51 L 27,40 C 25,39 22,39 20,39 9,39 0,48 0,59 v 60 c 0,8 5,15 13,18 l 46,17 v 158 c 0,10 8,19 18,19 10,0 19,-9 19,-19 V 167 l 83,31 v 158 c 0,10 9,19 19,19 10,0 18,-9 18,-19 V 211 l 32,12 c 2,1 5,1 7,1 11,0 20,-9 20,-20 v -60 c 0,-8 -5,-16 -13,-19 L 216,109 V -51 l 32,11 c 2,1 5,1 7,1 11,0 20,-9 20,-20 v -60 c 0,-8 -5,-15 -13,-18 l -46,-17 V -312 z M 96,65 V -95 l 83,30 V 95 z" })
  );
};


export default SharpSvg;