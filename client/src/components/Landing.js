import React, { Component } from 'react';
import PropTypes from 'prop-types';
import languages from '../languages';
import Button from '@material-ui/core/Button';
// import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from '@material-ui/core/Typography';
// import { blue } from '@material-ui/core/colors';
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
const ranImg = [Math.floor((Math.random() * 14))];


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = (e) => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    document.cookie = `lang_id=${value}; max-age=60*1000`;
    onClose(value);
    window.location.replace("/hi")
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      {/* <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle> */}
      <List className="lang-list">
        {languages.types.map((lan, i) => (
          <ListItem className="lang-list-item" key={i} button onClick={() => handleListItemClick(i)}>
            <ListItemText primary={lan.language} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function Landing (props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(languages.types[0].language);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className="landing">
      <h2 className="sentence">
        <div className="slidingVertical">
          {languages.types.map((lan, i) => <span key={i+1}>{lan.landing[0]}</span>)}
        </div>
      </h2>
      <h1>Siren.</h1>
      <div className="landing-img">
        <img id="blob" src={blob} />
        <img id="siren" src={sirens[ranImg]} />
      </div>
      <Button className="landing-bttn" variant="contained" color="primary" onClick={handleClickOpen}>
      <h2 className="sentence sentence-bttn">
        <div className="slidingVertical">
          {languages.types.map((lan, i) => <span className="lang-bttn" key={i+1}>{lan.landing[1]}</span>)}
        </div>
      </h2>
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

export default Landing;