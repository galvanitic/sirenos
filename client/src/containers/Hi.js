import { connect } from "react-redux";
import Hi from '../components/Hi';
import { chLang } from "../redux/actions";

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

export default connect(mapStateToProps, mapDispatchToProps)(Hi)