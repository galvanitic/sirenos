import { connect } from "react-redux";
import { chLang } from "../redux/actions";
import Landing from '../components/Landing';

const mapStateToProps = state => {
  return {
    language: state.language
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chLang: index => dispatch(chLang(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)