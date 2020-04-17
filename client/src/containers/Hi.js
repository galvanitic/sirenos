import { connect } from "react-redux";
import Hi from '../components/Hi';
import { chLang, loaderOn, loaderOff } from "../redux/actions";

const mapStateToProps = state => {
  return {
    language: state.language,
    loader: state.loader
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chLang: index => dispatch(chLang(index)),
    loaderOn: () => dispatch(loaderOn()),
    loaderOff: () => dispatch(loaderOff())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hi)