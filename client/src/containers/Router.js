import { connect } from "react-redux";
import Router from '../Router';
import { chLang } from "../redux/actions";

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

export default connect(mapStateToProps, mapDispatchToProps)(Router)