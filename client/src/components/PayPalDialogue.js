import React, { PropTypes } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import qr from '../img/qr_PayPal.png';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const PayPalDialogue = props => {
  return (
    <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="PayPal-dialogue-title" className="pay-title">
          {"PayPal"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{paddingBottom: '10px', textAlign: 'center'}} id="PayPal-dialog-description" className="pay-description">
            @galvanitic
          </DialogContentText>
          <div className="qr-code">
            <a href='https://www.paypal.com/donate/?business=AZ2EEWJ8FHGRE&no_recurring=0&currency_code=USD' target="_blank" rel='noreferrer'>
              <img className='qr' src={qr} alt='Paypal QR Code' />
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

export default PayPalDialogue;