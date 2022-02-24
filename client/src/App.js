import React from 'react';
import './css/App.css';
import './css/lang-roll.css';
import './css/main.css';
import Router from './containers/Router';
import NavBar from './containers/NavBar';
import Footer from './components/Footer';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
// import { IoLogoVenmo } from "@react-icons/all-files/io5/IoLogoVenmo";
import { IoLogoVenmo, IoLogoPaypal } from "react-icons/io5";
import { SiCashapp } from "react-icons/si";
import { GiPayMoney } from "react-icons/gi";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import VenmoDialogue from './components/VenmoDialogue';
import CashAppDialogue from './components/CashAppDialogue';
import PayPalDialogue from './components/PayPalDialogue';

const favor = createMuiTheme({
  palette: {
    primary: {
      main: '#ca4862',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const [openCard, setOpenCard] = React.useState(false)
  const handleCardOpen = () => {
    setOpenCard(true);
  };
  const handleCardClose = () => {
    setOpenCard(false);
  };

  const [openVenmo, setOpenVenmo] = React.useState(false)
  const handleVenmoOpen = () => {
    setOpenVenmo(true);
  };
  const handleVenmoClose = () => {
    setOpenVenmo(false);
  };

  const [openCashApp, setOpenCashApp] = React.useState(false)
  const handleCashAppOpen = () => {
    setOpenCashApp(true);
  };
  const handleCashAppClose = () => {
    setOpenCashApp(false);
  };

  const [openPayPal, setOpenPayPal] = React.useState(false)
  const handlePayPalOpen = () => {
    setOpenPayPal(true);
  };
  const handlePayPalClose = () => {
    setOpenPayPal(false);
  };

  const actions = [
    // { icon: <FaCreditCard />, 
    //           name: 'PCI Compliant Card Payment', 
    //           handler: handleCardOpen },
    { icon: <IoLogoVenmo />, 
              name: 'Venmo',
              handler: handleVenmoOpen },
    { icon: <SiCashapp />, 
              name: 'CashApp',
              handler: handleCashAppOpen },
    { icon: <IoLogoPaypal />, 
              name: 'PayPal',
              handler: handlePayPalOpen },
  ];

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <ThemeProvider theme={favor}>
          <SpeedDial
            ariaLabel="Make a Gift"
            className={classes.speedDial}
            hidden={false}
            icon={<GiPayMoney style={{fontSize: '35px'}} openicon={<LoyaltyIcon />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.handler}
            />
            ))}
          </SpeedDial>
        </ThemeProvider>
        {/* <CardDialogue muiTheme={favor} open={openCard} handleClose={handleCardClose}/> */}
        <VenmoDialogue muiTheme={favor} open={openVenmo} handleClose={handleVenmoClose}/>
        <CashAppDialogue muiTheme={favor} open={openCashApp} handleClose={handleCashAppClose} />
        <PayPalDialogue muiTheme={favor} open={openPayPal} handleClose={handlePayPalClose} />
        <Router />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
