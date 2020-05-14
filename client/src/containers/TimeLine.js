import { connect } from "react-redux";
import TimeLine from '../components/TimeLine';
import { chLang, fetchSirens, addSiren, loaderOn, loaderOff } from "../redux/actions";

const mapStateToProps = state => {
  return {
    language: state.language,
    loader: state.loader,
    sirens: state.sirens
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chLang: (lang_id) => dispatch(chLang(lang_id)),
    loaderOn: () => dispatch(loaderOn()),
    loaderOff: () => dispatch(loaderOff()),
    fetchSirens: () => dispatch(fetchSirens()),
    addSiren: (siren) => dispatch(addSiren(siren))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine)