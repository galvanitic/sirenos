import React, { Component } from 'react';
import cookie from 'cookie';
import languages from '../languages';
import Button from '@material-ui/core/Button';
import '../css/hi.css';


class Hi extends Component {
  state = {
    lang_id: 0,
  }
  componentDidMount(){
    var cookies = cookie.parse(document.cookie || '');
    this.setState({lang_id: cookies.lang_id})
  }
  handleAgree() {
    window.location.replace("/track");
  }
  render() {
    const text = languages.types[this.state.lang_id].hi;
    return (
      <div className="hi-container">
        <h1>{text[0]}</h1>
        <p>{text[1]}</p>
        <Button className="agree-cookies-bttn" variant="contained" onClick={this.handleAgree}>
          {text[2]}
        </Button>
      </div>
    );
  }
}

export default Hi;