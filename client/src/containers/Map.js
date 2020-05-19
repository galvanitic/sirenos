import { connect } from "react-redux";
import Map from '../components/Map';
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
    fetchSirens: () => dispatch(fetchSirens()),
    addSiren: (siren) => dispatch(addSiren(siren)),
    resetRes: () => dispatch(resetRes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)