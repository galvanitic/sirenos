import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import cookie from 'cookie';
import languages from '../languages';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Login from '../containers/Login';
import '../css/main.css'

const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  return cookies["lang_id"] ? true : false;
}

let NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [completed, setCompleted] = React.useState(0);
  const [lang_id, chLangId] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    var cookies = cookie.parse(document.cookie || '');
    chLangId(cookies.lang_id)
    // props.chLang(lang_id);
    // console.log(props.language)

    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <div className="NavBar">
      {/* <LinearProgress variant="determinate" value={completed} color="secondary" /> */}
      <AppBar className="app-bar" position="static">
        <Toolbar>
          {/* {checkAuth() ? <Button color="inherit" onClick={handleClick}>{languages.types[lang_id].language}</Button> : null} */}
          {/* {console.log(checkAuth() ? languages.types[lang_id].iso : 'hide')} */}
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;