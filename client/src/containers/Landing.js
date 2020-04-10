import { connect } from "react-redux";
import Landing from '../components/Landing';
import { chLang } from "../context/actions";

const mapStateToProps = state => {
  return {
    language: state.language
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chLang: (lang_id) => dispatch(chLang(lang_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)