import { connect } from 'react-redux';
import { changeUrl, mountCards, setClock } from '../actions/actions.js';
import FloatingTile from "./floatingTile.js";
import Auth from "../src/modules/Auth.js";

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onClick: () => {
            
            //xml request here to mount cards
            const xhr = new XMLHttpRequest();
            const data = ownProps.lessonMeta;
            const email = encodeURIComponent(ownProps.email);
            const durations = data.durations.join("_");
            const accidentals = data.accidentals ? data.accidentals.join("_") : 'none';
            const url = `/api/getCards/${email}/${data.minimumMidi}/${data.maximumMidi}/${accidentals}/${durations}`;
            xhr.open("get",url);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
            xhr.responseType = "json";
            console.log(xhr);
            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                console.log("response", xhr.response);
                dispatch(mountCards(xhr.response.cards, ownProps.lessonMeta));
                dispatch(changeUrl("/interface"));
                dispatch(setClock());
                }
            });
            xhr.send();
            
        }
    }
}

const FloatingTileContainer = connect(null,mapDispatchToProps)(FloatingTile);

export default FloatingTileContainer;