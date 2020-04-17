import React from 'react';
import { Redirect } from "react-router-dom";
import cookie from 'cookie';
import languages from '../languages';
import Button from '@material-ui/core/Button';
import SimpleDialog from '../containers/SimpleDialog'
import blob from '../img/blob-white.png';
import siren1 from '../img/siren-1.png';
import siren2 from '../img/siren-2.png';
import siren3 from '../img/siren-3.png';
import siren4 from '../img/siren-4.png';
import siren5 from '../img/siren-5.png';
import siren6 from '../img/siren-6.png';
import siren7 from '../img/siren-7.png';
import siren8 from '../img/siren-8.png';
import siren9 from '../img/siren-9.png';
import siren10 from '../img/siren-10.png';
import siren11 from '../img/siren-11.png';
import siren12 from '../img/siren-12.png';
import siren13 from '../img/siren-13.png';
import siren14 from '../img/siren-14.png';
import siren15 from '../img/siren-15.png';
let sirens = [siren1, siren2, siren3, siren4, siren5, siren6, siren7, siren8, siren9, siren10, siren11, siren12, siren13, siren14, siren15];
const ranImg = [Math.floor((Math.random() * 13) + 1)];


const Landing = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [scrollHeight, setScrollHeight] = React.useState(0);
  
  const blobStyle = { 
      transform: `translate(0px, ${- scrollHeight/2}px)` 
  };
  const sirenStyle = { 
    transform: `translate(0px, ${- scrollHeight/5}px)` 
};
  const scrollChange = (e) => {
    const y = window.scrollY;
    setScrollHeight(y)
}

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  
  const Content = () => {
    return (
      <div className="landing">
        {window.addEventListener("scroll", scrollChange)}
        <h2 className="sentence">
          <div className="slidingVertical">
            {languages.types.map((lan, i) => <span key={i+1}>{lan.landing[0]}</span>)}
          </div>
        </h2>
        <h1>Siren.</h1>
        {/* <p>You speak {languages.types[props.language].language}</p> */}
        <div className="landing-img">
          <img style={blobStyle} id="blob" src={blob} alt='Merman' />
          <img style={sirenStyle} id="siren" src={sirens[ranImg]} alt='' />
        </div>
        <Button className="landing-bttn" variant="contained" color="primary" onClick={handleClickOpen}>
        <h2 className="sentence sentence-bttn">
          <div className="slidingVertical">
            {languages.types.map((lan, i) => <span className="lang-bttn" key={i+1}>{lan.landing[1]}</span>)}
          </div>
        </h2>
        </Button>
        <SimpleDialog languages={languages} selectedValue={selectedValue} open={open} onClose={handleClose} />
      </div>
    );
  }

  const checkLang = () => {
    const cookies = cookie.parse(document.cookie);
    if (cookies["lang_id"] >= 0 || props.language !== null) {
      return true;
    }else {
      return false;
    }
  }
  
  const Component = () => {
    return(   
      checkLang()
        ? <Redirect to='/hi' />
        : <Content />
      )
  }

  return (
    <Component />
  );
}

export default Landing;