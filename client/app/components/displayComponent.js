import React, { Component, PropTypes } from "react"
import { Flow } from "vexflow";
import { createVexFlowChord } from "../game/vexflow.js";

const {
  Formatter,
  Factory,
  EasyScore,
  System,
  Beam,
  Stave,
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
  
  /*methods for: init draws blank...update clears and draws chord*/
  drawCanvas() {
    
    
    let width = this.props.midiValues.length * 50 + 50;
    
    const svgContainer = document.createElement("div");
    svgContainer.id = "svgDiv";
    
    if (this.refs.vfWrap.childNodes[0]) {
      this.refs.vfWrap.removeChild(this.refs.vfWrap.childNodes[0]);
    }
    this.refs.vfWrap.appendChild(svgContainer);
    
    const vf = new Factory({renderer: {
          selector: "svgDiv"
        }});
    
    let x = 0;
    let y = 0;
    
    const makeSystem = (width) => {
      let sys = vf.System({ x: x, y: y, width: width, spaceBetweenStaves: 10});
      x += width;
      return sys;
    }
    
    let score = vf.EasyScore();
    let system = makeSystem(500);
    
    system.addStave({
      voices: [
        score.voice(
          score.notes('C#5/q, B4')
          .concat(score.notes('C#5/8, B4, A4, G#4'))
        )
      ]
    }).addClef('treble');
    
    system = makeSystem(300);
    
    system.addStave({
      voices: [
        score.voice(
          score.notes('C#5/q, B4')
          .concat(score.notes('C#5/8, B4, A4, G#4'))
        )
      ]
    }).addClef('treble');

    vf.draw();
    
    /*
    // Create an SVG renderer and attach it to the DIV element named "div".
    
    const renderer = new Renderer(svgContainer, Renderer.Backends.SVG);

    // Configure the rendering context.
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // bottomstaff at 60 will put middle C in center
    const topStaff = new Stave(10, 0, width);
    const bottomStaff = new Stave(10, 60, width);

    // Add a clef
    topStaff.addClef("treble");
    bottomStaff.addClef("bass");

    var brace = new StaveConnector(topStaff, bottomStaff).setType(3);
    var lineLeft = new StaveConnector(topStaff, bottomStaff).setType(1);
    var lineRight = new StaveConnector(topStaff, bottomStaff).setType(7);

    topStaff.setContext(context).draw();
    bottomStaff.setContext(context).draw();

    brace.setContext(context).draw();
    lineLeft.setContext(context).draw();
    lineRight.setContext(context).draw();

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
    
    let midiValues = this.props.midiValues;
    let durations = this.props.durations;
    let accidentals = this.props.accidentals;
    
    let staff = ( midiValues[0] > 59 ? topStaff : bottomStaff );
    
    let notes = [];
    
    midiValues.forEach( (midiValue, i) => {
      console.log(midiValue,durations[i], accidentals[i]);
      notes.push(createVexFlowChord(midiValue,durations[i],accidentals[i]))
      }
    );
    
    var beams = Beam.generateBeams(notes);

    beams.forEach(function(beam) {
      beam.setContext(context).draw();
    });
    
    let bb = Formatter.FormatAndDraw(context,staff,notes);
    */
    

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