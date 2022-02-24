import React, { PropTypes } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import qr from '../img/qr_venmo.jpg';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const VenmoDialogue = props => {
  return (
    <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="venmo-dialogue-title" className="pay-title">
          {"Venmo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{paddingBottom: '10px', textAlign: 'center'}} id="venmo-dialog-description" className="pay-description">
            @galvanitic
          </DialogContentText>
          <div className='qr-code' >
            <a href='https://venmo.com/u/galvanitic' target="_blank" rel='noreferrer'>
              <img className='qr' src={qr} alt='Venmo QR Code' />
            </a>
          </div>
        </DialogContent>
        <DialogActions>
          <ThemeProvider theme={props.muiTheme}>
            <Button onClick={props.handleClose}>Close</Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
  );
};

export default VenmoDialogue;