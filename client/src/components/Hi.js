import React, { Component } from 'react';
import cookie from 'cookie';
import languages from '../languages';
import Button from '@material-ui/core/Button';
import '../css/hi.css';
import blob from '../img/blob-2.png';
import siren from '../img/siren-1.png'

let Hi = props => {
  const [lang_id, chLangId] = React.useState(null);
  const [text, setText] = React.useState(null);
  const didMountRef = React.useRef(false)
  var cookies = cookie.parse(document.cookie || '');
  
  const checkSpecialLang = () => {
    if(props.language == 3){
      return 'zh'
    }else if (props.language == 4){
      return 'hi'
    }
  }
  React.useEffect(() => {
    if (didMountRef.current) {
      console.log('Comp did mount.')
      // setText(languages.types[props.language].hi);
    }else {
      didMountRef.current = true;
    }
  })

  const handleAgree = () => {
    // this.props.chLang(cookies.lang_id);
    // this.props.dispatch(chLang(cookies.lang_id))
    window.location.replace("/track");
  }
  return (
    <div id={checkSpecialLang()} className="hi-container">
      <h1>{text[0]}</h1>
      <img className='siren-img' src={siren} />
      <div className='intro'>
        <p>{text[1]}</p>
        <img src={blob} />
      </div>
      <p className="question">{text[2]}</p>
      <Button color='secondary' className="agree-cookies-bttn" variant="contained" onClick={handleAgree}>
        <p>{text[4]}</p>
      </Button>
    </div>
  );
}

export default Hi;