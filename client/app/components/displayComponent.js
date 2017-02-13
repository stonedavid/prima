import React, { Component, PropTypes } from "react"
import { Flow } from "vexflow";
import { createVexFlowChord } from "../game/vexflow.js";
import v1 from "node-uuid";

const {
  Formatter,
  Factory,
  EasyScore,
  System,
  StaveLine,
  Beam,
  Stave,
  Renderer,
  RESOLUTION,
  StaveConnector,
  Accidental,
  StaveNote,
} = Flow;

console.log(Factory);

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
    const id = v1();
    console.log("ID",id);
    svgContainer.id = id;
    
    
    
    if (this.refs.vfWrap.childNodes[0]) {
      this.refs.vfWrap.removeChild(this.refs.vfWrap.childNodes[0]);
    }
    this.refs.vfWrap.appendChild(svgContainer);
    
    const vf = new Factory({renderer: {
          selector: id
        }});
    
    const score = vf.EasyScore({ throwOnError: true });
    const voice = score.voice.bind(score);
    const notes = score.notes.bind(score);
    const beam = score.beam.bind(score);

    let x = 10;
    let y = 0;
    
    function makeSystem(width) {
      var system = vf.System({ x: x, y: y, width: width, spaceBetweenStaves: 10 });
      x += width;
      return system;
    }
    
    let system = makeSystem(300);
    
    let vc1 = voice(
          notes('C#5/q[id="m1a"], B4/8, A4/16[id="m2a"]'),
          { time: "7/16" }
        );
  
    system.addStave({
      voices: [vc1]
    }).addClef('treble');
    
    vf.Curve({
        from: vc1.tickables[0],
        to: vc1.tickables[1],
      });
    
   

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
          margin: 0,
          backgroundColor: "rgba(255,255,255,0.8)",
          display: "inline-block",
          animation: "taufik 2s"
        }}>
      </div>;
    }
}

export default Display;