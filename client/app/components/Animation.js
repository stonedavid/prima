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
} = Flow;

class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 10,
            timestamp: 0,
            svg: null,
            trebleTickables: [],
            bassTickables: []
        };
    }

    componentDidMount() {
        this.initDraw();
    }
    
    componentDidUpdate() {
        window.requestAnimationFrame(this.updateOffset);
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
        
        vf.draw();
        const trebleTickables = system.parts[0].voices[0].tickables;
        const bassTickables = system.parts[1].voices[0].tickables;
        svg.style.top = "0px";
        svg.style.height = 180;
        //svg.style.left = this.state.x + "px";
        svg.style.width = "250px";
        svg.style.position = "relative";
        svg.style.overflow = "hidden";
        svgContainer.style.height = "180px";
        svgContainer.style.position = "relative";
        svgContainer.style.display = "inline-block";
        svgContainer.style.overflow = "hidden";
        
        this.setState({
            svg: svg,
            trebleTickables: trebleTickables,
            bassTickables: bassTickables
        });
        //svg.removeChild(pathEl);
        //svg.parentNode.replaceChild(svg.cloneNode(false), svg);
    }

    updateOffset = (timestamp) => {
        let newX;
        let svg = this.state.svg;
        if (!this.state.timestamp) {
            newX = this.state.x;
        } else {
            newX = this.state.x - ((timestamp - this.state.timestamp) * (.1)); 
        }
        
        if (newX < -100) {return;}
        
        let currentIntersection = this.state.trebleTickables.filter( tickable => {
            let bb = tickable.getBoundingBox();
            return !!bb &&(bb.x + this.state.x - 50 < 0) && (bb.w + bb.x + this.state.x - 50 > 0);
        });
        
        currentIntersection = currentIntersection[0] ? currentIntersection[0].attrs.el.id : null;
    
        
        svg.childNodes.forEach(node => {
            if (node.id === "playhead") {
                svg.removeChild(node);
            } else if (node.id === currentIntersection) {
                var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
                                        filter.setAttribute("id","f1");
                                        filter.setAttribute("x","0");
                                        filter.setAttribute("y","0");

                                        var gaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
                                        gaussianFilter.setAttribute("in","SourceGraphic");
                                        gaussianFilter.setAttribute("stdDeviation","15");

                                        filter.appendChild(gaussianFilter);
                                        node.appendChild(filter);
                node.childNodes.forEach( g => {
                    if (g.className.baseVal  === "vf-note") {
                        g.childNodes.forEach( h => {
                            
                            switch (h.className.baseVal) {
                                
                                case "vf-notehead":
                                    h.childNodes.forEach( i => {
                                        
                                        i.setAttribute("style","fill: green; stroke: green; -webkit-filter: blur(25px);")
                                    });
                                case "vf-stem":
                                    h.childNodes.forEach( i => {
                                        i.setAttribute("style","fill: green; stroke: green; -webkit-filter: blur(25px);")
                                    });
                                case "vf-flag":
                                    h.childNodes.forEach( i => {
                                        i.setAttribute("style","fill: green; stroke: green; -webkit-filter: blur(25px);")
                                    });
                                default:
                                    return
                            }
                        })
                    }
                });
                node.setAttribute("transform",`translate(${this.state.x},0)`);
            } else {
                node.setAttribute("transform",`translate(${this.state.x},0)`);
            }
        });
        
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        pathEl.setAttribute('d', `M 50 0 V 180`);
        pathEl.setAttribute("id","playhead");
        pathEl.style.stroke = 'rgb(0,0,0)';
        svg.appendChild(pathEl);
        
        this.setState((prevState,props) => {
            return {
                x: newX,
                timestamp: timestamp,
                svg: svg
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