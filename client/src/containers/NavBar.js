import { connect } from "react-redux";
import NavBar from '../components/NavBar';
import { chLang, loaderOn, loaderOff } from "../redux/actions";

const mapStateToProps = state => {
  return {
    language: state.language,
    loader: state.loader
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chLang: (lang_id) => dispatch(chLang(lang_id)),
    loaderOn: () => dispatch(loaderOn()),
    loaderOff: () => dispatch(loaderOff())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)