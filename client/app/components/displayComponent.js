import React, { Component, PropTypes } from "react"
import { Flow } from "vexflow";
import { createVexFlowChord } from "../game/vexflow.js";
import Rational from "rational-number";
import v1 from "node-uuid";

const {
  Formatter,
  Factory,
  EasyScore,
  System,
  StaveLine,
  Beam,
  Stave,
  GhostNote,
  Renderer,
  RESOLUTION,
  StaveConnector,
  Accidental,
  StaveNote,
} = Flow;

console.log(StaveLine);
console.log(Factory);
console.log(GhostNote);

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
  
  drawCanvas() {
    
    /*
     * Set up div
     */
    
    const svgContainer = document.createElement("div");
    const id = v1();
    svgContainer.id = id;
    
    if (this.refs.vfWrap.childNodes[0]) {
      this.refs.vfWrap.removeChild(this.refs.vfWrap.childNodes[0]);
    }
    this.refs.vfWrap.appendChild(svgContainer);
    
    
    /*
     * Bind vexflow methods
     */
    
    const vf = new Factory({renderer: {
          selector: id
        }});
        
    const ctx = vf.getContext();
    
    const score = vf.EasyScore({ throwOnError: true });
    const voice = score.voice.bind(score);
    const notes = score.notes.bind(score);
    const beam = score.beam.bind(score);

    /*
     * Score constants and functions
     */

    let x = 10;
    let y = 0;
    
    const rhythmicDivisions = ["w","h","q","8","16"];
    
    function makeSystem(width) {
      var system = vf.System({ x: x, y: y, width: width, spaceBetweenStaves: 6 });
      x += width;
      return system;
    }
    
    function drawLine(notes,startIndex,endIndex) {
      let sl = new StaveLine({
          first_note: notes.tickables[startIndex], 
          last_note: notes.tickables[endIndex]
      });
      sl.setContext(ctx).draw();
    }
    
    
    
    
    /*
     * Render to score
     */
     
    let width = this.props.noteString.split(",").length * 50 + 50;
    let system = makeSystem(width);
    
    let durations = this.props.noteString.split(",").map( str => {
      return rhythmicDivisions.indexOf(str.split("/").pop());
    });
    
    let timeMap = durations.map( dur => {
      return new Rational(
        1, 
        Math.pow(2,dur)
        );
    });
    
    let time = timeMap.reduce( function(a, b) {
      return a.add(b);
    }, new Rational(0,1));
    
    let ghosts = voice(durations.map(function(dur) {
        console.log(dur);
        return new GhostNote(rhythmicDivisions[dur]);
      }),
      { time: time.toString() }
      );
    
    
    let vc1 = voice(
          notes(this.props.noteString),
          { time: time.toString() }
        );
        
    console.log(vc1,ghosts);
  
    system.addStave({
      voices: [vc1]
    }).addClef('treble');
    
    system.addStave({
      voices: [ghosts]
    }).addClef('bass');
    

    vf.draw();
    
    const svg = svgContainer.childNodes[0];
    svg.style.top = "0px";
    svg.style.height = 180;
    svg.style.left = "0px";
    svg.style.width = width + 20 + "px";
    svg.style.position = "relative";
    svg.style.overflow = "visible";
    svgContainer.style.height = "180px";
    svgContainer.style.position = "relative";
    svgContainer.style.display = "inline-block";
    

  }
  render() {
    return <div ref="vfWrap" style={{
          border: "2px gray solid",
          padding: 10,
          borderRadius: 20,
          margin: 0,
          backgroundColor: "rgba(255,255,255,0.8)",
          display: "inline-block",
          animation: "taufik 2s"
        }}>
      </div>;
    }
}

Display.propTypes = {
  noteString: PropTypes.string.isRequired,
  line: PropTypes.bool,
}

export default Display;