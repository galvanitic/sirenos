import React from 'react';
import languages from '../languages';
import Button from '@material-ui/core/Button';
import '../css/hi.css';
import blob from '../img/blob-2.png';
import siren from '../img/siren-1.png'

class Hi extends React.Component {
  state = {
    text: languages.types[this.props.language].hi
  }
  
  checkSpecialLang = () => {
    switch(this.props.language){
      case 3:
        return'zh'
      case 4:
        return 'hi'
    }
  }

  handleAgree = () => {
    document.cookie = `lang_id=${this.props.language}; max-age=60*1000`;
    //     window.location.replace("/track");
  }
  
  render() {
    return (
      <div id={this.checkSpecialLang()} className="hi-container">
       <h1>{this.state.text[0]}</h1>
       <img className='siren-img' src={siren} />
       <div className='intro'>
         <p>{this.state.text[1]}</p>
         <img src={blob} />
       </div>
       <p className="question">{this.state.text[2]}</p>
       <Button color='secondary' className="agree-cookies-bttn" variant="contained" onClick={this.handleAgree}>
         <p>{this.state.text[4]}</p>
       </Button>
     </div>
    );
  }
}

export default Hi;