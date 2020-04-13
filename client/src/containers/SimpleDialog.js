import { connect } from "react-redux";
import SimpleDialog from '../components/SimpleDialog';
import { chLang } from "../redux/actions";

const mapStateToProps = state => {
  return {
    language: state.language
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chLang: (index) => dispatch(chLang(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleDialog)