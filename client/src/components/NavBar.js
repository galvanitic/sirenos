import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import languages from '../languages';
import SimpleDialog from '../containers/SimpleDialog'
import '../css/main.css'


let NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [completed, setCompleted] = React.useState(0);
  const [lang_id, chLangId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  
  const checkAuth = () => {
    if (props.language !== null) {
      return true;
    }else {
      return false;
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className="NavBar">
      {/* <LinearProgress variant="determinate" value={completed} color="secondary" /> */}
      <AppBar className="app-bar" position="static">
        <Toolbar>
          {checkAuth() ? <Button color="inherit" onClick={handleClickOpen}>{languages.types[props.language].language}</Button> : null}
          <SimpleDialog languages={languages} selectedValue={selectedValue} open={open} onClose={handleClose} />
          {/* {console.log(checkAuth() ? languages.types[lang_id].iso : 'hide')} */}
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;