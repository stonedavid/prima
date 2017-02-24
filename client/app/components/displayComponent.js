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
    
    const VF = function() {
      return
    };
    
    VF.prototype = new Factory({renderer: {
          selector: id
        }});
        
    VF.prototype.draw = function() {
      this.systems.forEach(i => i.setContext(this.context).format());
      this.staves.forEach(i => i.setContext(this.context).draw());
      this.voices.forEach(i => i.setContext(this.context).draw());
      this.renderQ.forEach(i => {
      if (!i.isRendered()) i.setContext(this.context).draw();
      });
      this.systems.forEach(i => i.setContext(this.context).draw());
    };
    
    const vf = new VF();
        
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
      var system =  vf.System({ x: x, y: y, width: width, spaceBetweenStaves: 6 });
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
     * Maps of note values for different vexflow objects
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
    
    let time = timeMap.reduce( (a,b) => {
      return a.add(b);
    }, new Rational(0,1));
    
    
    /*
     * Iterate over notestring, creating orthogonal bass and treble voices
     */
    
    let trebleNotes = [];
    let bassNotes = [];
    
    this.props.noteString.split(",").forEach(str => {
      
      let octave = /(\d)\//.exec(str)[1];
      let duration = str.split("/").pop();
      
      if (octave > 3) {
        trebleNotes = trebleNotes.concat(notes(str));
        bassNotes.push(new GhostNote(duration));
      } else {
        bassNotes = bassNotes.concat(notes(str, {clef: "bass"}));
        trebleNotes.push(new GhostNote(duration));
      }
    });
    
    
    let trebleVoice = voice(trebleNotes, { time: time.toString() });
    let bassVoice = voice(bassNotes, { time: time.toString() });
    
    system.setOptions({
      x: -100,
      y: y,
      width: width,
      spaceBetweenStaves: 6,
      factory: vf
    });
        
  
    system.addStave({
      voices: [trebleVoice]
    }).addClef('treble');
    
    system.addStave({
      voices: [bassVoice]
    }).addClef('bass');
    
    system.addConnector("single");

    system.addConnector("singleRight");
    
    /*
     * Draw and format SVG
     */
    
    
    
    
    vf.draw();

    const svg = svgContainer.childNodes[0];
    console.log("SVG",svg.childNodes);
    svg.style.top = "0px";
    svg.style.height = 180;
    svg.style.left = "0px";
    svg.style.width = width + 20 + "px";
    svg.style.position = "relative";
    svg.style.overflow = "hidden";
    svgContainer.style.height = "180px";
    svgContainer.style.position = "relative";
    svgContainer.style.display = "inline-block";
    
    var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute('d','M 50 0 V 180' );
    pathEl.style.stroke = 'rgb(0,0,0)';
    pathEl.style.strokeWidth = '5';
    pathEl.style.fill = 'none';
    //svg.appendChild(pathEl);
    //svg.removeChild(pathEl);
    //svg.parentNode.replaceChild(svg.cloneNode(false), svg);

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