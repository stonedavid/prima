import React, { Component, PropTypes } from "react"
import { Flow } from "vexflow";
import { createVexFlowChord } from "../utils.js";

const {
  Formatter,
  Stave,
  Renderer,
  RESOLUTION,
  StaveConnector
} = Flow;

/* store renderer in the redux store? */

class Display extends Component{
  constructor(props) {
    super(props);
    this.drawCanvas = this.drawCanvas.bind(this);
  }
  
  componentDidMount() {
    this.drawCanvas();
  }
  
  componentDidUpdate() {
    this.drawCanvas();
  }
  
  /*methods for: init draws blank...update clears and draws chord*/
  drawCanvas() {
    // Create an SVG renderer and attach it to the DIV element named "div".
    const svgContainer = document.createElement("div");
    const renderer = new Renderer(svgContainer, Renderer.Backends.SVG);

    // Configure the rendering context.
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const topStaff = new Stave(10, 0, 100);
    const bottomStaff = new Stave(10, 60, 100);

    // Add a clef
    topStaff.addClef("treble");
    bottomStaff.addClef("bass");

    //var brace = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(3);
    var lineLeft = new StaveConnector(topStaff, bottomStaff).setType(1);
    var lineRight = new StaveConnector(topStaff, bottomStaff).setType(7);

    topStaff.setContext(context).draw();
    bottomStaff.setContext(context).draw();

    //brace.setContext(context).draw();
    lineLeft.setContext(context).draw();
    lineRight.setContext(context).draw();

    const svg = svgContainer.childNodes[0];
    const padding = 10;
    const half = padding / 2;
    const bassHeight = 120;
    svg.style.top = "0px";
    svg.style.height = 180;
    svg.style.left = "0px";
    svg.style.width = 120 + "px";
    svg.style.position = "relative";
    svg.style.overflow = "visible";
    svgContainer.style.height = "180px";
    svgContainer.style.position = "relative";
    svgContainer.style.display = "inline-block";
    
    if (this.props.displayNote) {
      if (this.props.displayNote > 59) {
        var bb = Formatter.FormatAndDraw(context,topStaff,createVexFlowChord(this.props.displayNote,"h","#"));
      } else {
        var bb = Formatter.FormatAndDraw(context,bottomStaff,createVexFlowChord(this.props.displayNote,"h","#"));
      }
    }
    
    if (this.refs.vfWrap.childNodes[0]) {
      this.refs.vfWrap.removeChild(this.refs.vfWrap.childNodes[0]);
    }
    this.refs.vfWrap.appendChild(svgContainer);

  }
  render() {
    return <div ref="vfWrap" style={{
          border: "2px gray solid",
          padding: 10,
          borderRadius: 20,
          margin: 20,
          backgroundColor: "rgba(255,255,255,0.8)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          display: "inline-block",
          animation: "taufik 2s"
        }}>
      </div>;
    }
}

export default Display;