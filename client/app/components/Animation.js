import React, {
    Component,
    PropTypes
}
from "react"
import {
    Flow
}
from "vexflow";
import {
    createVexFlowChord
}
from "../game/vexflow.js";
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
    TickContext
} = Flow;

class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nUpdates: 0,
            BPM: 70,
            x: 10,
            timestamp: 0,
            svg: null,
            currentIntersection: null,
            trebleTickables: [],
            bassTickables: []
        };
    }

    componentDidMount() {
        this.initDraw();
    }

    componentDidUpdate() {
        setTimeout(() => this.updateOffset(Date.now()), 16);
    }

    initDraw = () => {
        /*
         * Set up div
         */

        const svgContainer = document.createElement("div");
        const id = v1();
        svgContainer.id = id;

        /*if (this.refs.vfWrap.childNodes[0]) {
            this.refs.vfWrap.removeChild(this.refs.vfWrap.childNodes[0]);
        }*/
        this.refs.vfWrap.appendChild(svgContainer);


        /*
         * Bind vexflow methods
         */

        const VF = function() {
            return
        };

        VF.prototype = new Factory({
            renderer: {
                selector: id
            }
        });

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
        const score = vf.EasyScore({
            throwOnError: true
        });
        const voice = score.voice.bind(score);
        const notes = score.notes.bind(score);
        const beam = score.beam.bind(score);

        /*
         * Score constants and functions .. maybe some can be stored elsewhere? maybe the voices stay constant somehow
         *
         * this however will get very crazy for longer scores i think....egh i guess not
         *
         * def need to like not draw invisible bars
         */

        let x = 10;
        let y = 0;

        const rhythmicDivisions = ["w", "h", "q", "8", "16"];

        function makeSystem(width) {
            var system = vf.System({
                x: x,
                y: y,
                width: width,
                spaceBetweenStaves: 6
            });
            x += width;
            return system;
        }

        function drawLine(notes, startIndex, endIndex) {
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

        let durations = this.props.noteString.split(",").map(str => {
            return rhythmicDivisions.indexOf(str.split("/").pop());
        });

        let timeMap = durations.map(dur => {
            return new Rational(
                1,
                Math.pow(2, dur)
            );
        });

        let time = timeMap.reduce((a, b) => {
            return a.add(b);
        }, new Rational(0, 1));


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
            }
            else {
                bassNotes = bassNotes.concat(notes(str, {
                    clef: "bass"
                }));
                trebleNotes.push(new GhostNote(duration));
            }
        });


        let trebleVoice = voice(trebleNotes, {
            time: time.toString()
        });
        let bassVoice = voice(bassNotes, {
            time: time.toString()
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
         * Draw!
         */

        const svg = svgContainer.childNodes[0];

        let trebleTickables = system.parts[0].voices[0].tickables;
        let bassTickables = system.parts[1].voices[0].tickables;
        
        let tickContext = new TickContext();
        
        trebleTickables.forEach( note => {
            tickContext.addTickable(note);
        });
        
        tickContext.preFormat().setX(400);
        
        vf.draw();
        
        trebleTickables = system.parts[0].voices[0].tickables;
        bassTickables = system.parts[1].voices[0].tickables;
        

        trebleTickables.map((tickable, i) => {
            let bb = tickable.getBoundingBox();
            if (i < trebleTickables.length - 1) {
                let nextbb = trebleTickables[i + 1].getBoundingBox();
                tickable.distanceToNext = nextbb.x - bb.x;
                return tickable
            };
            return tickable;
        });
        


        console.log("Treble ticks: should have prop distanceToNext", trebleTickables);

        let systemWidth = system.options.width;

        svg.style.top = "0px";
        svg.style.height = 180;
        //svg.style.left = this.state.x + "px";
        svg.style.width = "500px";
        svg.style.position = "relative";
        svg.style.overflow = "hidden";
        svgContainer.style.height = "180px";
        svgContainer.style.position = "relative";
        svgContainer.style.display = "inline-block";
        svgContainer.style.overflow = "hidden";

        this.setState({
            svg: svg,
            trebleTickables: trebleTickables,
            bassTickables: bassTickables,
            systemWidth: systemWidth
        });
        //svg.removeChild(pathEl);
        //svg.parentNode.replaceChild(svg.cloneNode(false), svg);
    }

    updateOffset = (timestamp) => {
        if (this.state.nUpdates > 10000) {
            return;
        }
        let newX;
        let svg = this.state.svg;

        let trebleIntersection = this.state.trebleTickables.filter(tickable => {
            let bb = tickable.getBoundingBox();
            return !!bb && (bb.x + this.state.x - 50 < 0) && (bb.w + bb.x + this.state.x - 50 > 0);
        });

        let bassIntersection = this.state.bassTickables.filter(tickable => {
            let bb = tickable.getBoundingBox();
            return !!bb && (bb.x + this.state.x - 50 < 0) && (bb.w + bb.x + this.state.x - 50 > 0);
        });

        let bassIntersectionId = bassIntersection[0] ? bassIntersection[0].attrs.el.id : null;
        let trebleIntersectionId = trebleIntersection[0] ? trebleIntersection[0].attrs.el.id : null;
        if (trebleIntersection.length) {
            this.setState({
                currentIntersection: trebleIntersection[0]
            });
        }


        svg.childNodes.forEach(node => {
            if (node.id === "playhead") {
                svg.removeChild(node);
            }
            else if (node.id === trebleIntersectionId || node.id === bassIntersectionId) {

                node.childNodes.forEach(g => {
                    if (g.className.baseVal === "vf-note") {
                        g.childNodes.forEach(h => {
                            switch (h.className.baseVal) {

                                case "vf-notehead":
                                    h.childNodes.forEach(i => {

                                        i.setAttribute("style", "fill: green; stroke: green;");
                                    });
                                case "vf-stem":
                                    h.childNodes.forEach(i => {
                                        i.setAttribute("style", "fill: green; stroke: green;");
                                    });
                                case "vf-flag":
                                    h.childNodes.forEach(i => {
                                        i.setAttribute("style", "fill: green; stroke: green;");
                                    });
                                default:
                                    return;
                            }
                        });
                    }
                });
                node.setAttribute("transform", `translate(${this.state.x},0)`);
            }
            else {
                node.setAttribute("transform", `translate(${this.state.x},0)`);
            }
        });

        const durationMap = {
            "w": 4,
            "h": 2,
            "q": 1,
            "8": 0.5,
            "16": 0.25
        };

        if (!this.state.timestamp) {
            newX = this.state.x;
        }
        else if (!this.state.currentIntersection) {
            console.log("skipping frames");
            newX = this.state.x - 3;
        }
        else {
            //console.log("Intersecting note", this.state.currentIntersection);
            let currentIntersection = this.state.currentIntersection;
            //console.log("TIMESTAMP", timestamp, "STATE TIMESTAMP", this.state.timestamp);
            let timeDelta = (timestamp - this.state.timestamp) / 1000;
            let BPM = this.state.BPM;
            let duration = durationMap[currentIntersection.duration];
            let distanceToNext = currentIntersection.distanceToNext;
            //console.log(distanceToNext);
            //console.log(duration);
            //console.log("tdelta", timeDelta);
            //console.log("BPM", this.state.BPM);
            let distanceDelta = ((timeDelta * BPM) / (duration * 60));
            //console.log("distanceToNext", distanceToNext);
            //console.log("ddelta", distanceDelta);
            newX = this.state.x - (distanceToNext * distanceDelta);
            //console.log("new x", newX);
        }

        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");

        pathEl.setAttribute('d', `M 50 0 V 180`);
        pathEl.setAttribute("id", "playhead");
        pathEl.style.stroke = 'rgb(0,0,0)';
        svg.appendChild(pathEl);

        this.setState((prevState, props) => {
            return {
                x: newX,
                timestamp: timestamp,
                svg: svg,
                nUpdates: prevState.nUpdates + 1
            };
        });
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

Animation.propTypes = {
    noteString: PropTypes.string.isRequired,
    line: PropTypes.bool,
}

export default Animation;