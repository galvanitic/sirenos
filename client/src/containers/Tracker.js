import { connect } from "react-redux";
import Tracker from '../components/Tracker';
import { chLang, fetchSirens, addSiren } from "../context/actions";

const mapStateToProps = state => {
  return {
    language: state.language,
    sirens: state.sirens
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chLang: (lang_id) => dispatch(chLang(lang_id)),
    fetchSirens: () => dispatch(fetchSirens()),
    addSiren: (siren) => dispatch(addSiren(siren))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker)