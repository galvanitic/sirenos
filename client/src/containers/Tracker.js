import { connect } from "react-redux";
import Tracker from '../components/Tracker';
import { chLang, chCurrentUsrGeo, chActiveGeo, fetchSirens, addSiren, loaderOn, loaderOff, resetRes } from "../redux/actions";

const mapStateToProps = state => {
  return {
    language: state.language,
    loader: state.loader,
    currentUsrGeo: state.currentUsrGeo,
    activeGeo: state.activeGeo,
    sirens: state.sirens,
    sirenRes: state.sirenRes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chLang: (lang_id) => dispatch(chLang(lang_id)),
    chCurrentUsrGeo: (lat, lng) => dispatch(chCurrentUsrGeo(lat, lng)),
    chActiveGeo: (lat, lng) => dispatch(chActiveGeo(lat, lng)),
    loaderOn: () => dispatch(loaderOn()),
    loaderOff: () => dispatch(loaderOff()),
    fetchSirens: (start, end) => dispatch(fetchSirens(start, end)),
    addSiren: (siren) => dispatch(addSiren(siren)),
    resetRes: () => dispatch(resetRes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker)