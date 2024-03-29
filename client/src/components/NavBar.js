import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import languages from '../languages';
import SimpleDialog from '../containers/SimpleDialog'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';


import cookie from 'cookie';
import '../css/main.css'
const cookies = cookie.parse(document.cookie);

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

let NavBar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [completed, setCompleted] = React.useState(100);
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    nav: null,
    language: null,
    auth: false
  });

  React.useEffect(() => {
    const checkAuth = () => {
      if(props.language != null){
        // if data is in redux, use it.
        setState({
          nav: languages.types[props.language].nav,
          language: languages.types[props.language].language,
          auth: true})
      } 
      else if (cookies["lang_id"] >= 0){
          // if data is in cookie, use it.
        setState({
          nav: languages.types[cookies["lang_id"]].nav, 
          language: languages.types[cookies["lang_id"]].language,
          auth: true})
      }else {
        setState({auth: false})
      }
    }
    checkAuth()

    if(props.loader){
      function progress() {
        setCompleted((prevCompleted) => (prevCompleted <= 0 ? 100 : prevCompleted - 1));
      }
  
      const timer = setInterval(progress, 50);
      return () => {
        clearInterval(timer);
      };
    }else if (!props.loader) {
      function progress() {
        setCompleted((prevCompleted) => (prevCompleted <= 0 ? prevCompleted + 1  : 100));
      }
  
      const timer = setInterval(progress, 50);
      return () => {
        clearInterval(timer);
      };
    }
  }, [props])

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >{
      state.auth ?
      <div>
        <List>
        <ListItem button key={0} onClick={() => window.location.href = "https://sirenos.co/track"}>
          <ListItemIcon><GpsFixedIcon /></ListItemIcon>
          <ListItemText primary={state.nav.tracker} />
        </ListItem>
        <ListItem button key={1} onClick={()=> window.location.href = "https://www.informedimmigrant.com/resources/"}>
          <ListItemIcon><ExploreIcon /></ListItemIcon>
          <ListItemText primary={state.nav.resources} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={2} onClick={() => window.location.href = "mailto:hola@rglvn.com"}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary="hi@sirenos.co" />
        </ListItem>
        <ListItem button key={3} onClick={() => window.location.href = "https://www.paypal.com/donate/?business=AZ2EEWJ8FHGRE&no_recurring=0&currency_code=USD"}>
          <ListItemIcon><FavoriteIcon /></ListItemIcon>
          <ListItemText primary={state.nav.donate} />
        </ListItem>
      </List>
      </div> :
      null
    }
      
    </div>
  );
  return (
    <div className="NavBar">
       <LinearProgress className='linear-progress' variant="determinate" value={completed} color='secondary' />
        <AppBar className="app-bar" position="static">
        <Toolbar className="nav-toolbar">
          {state.auth ? 
          <div className="nav-tools">
            <div>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <IconButton onClick={toggleDrawer(anchor, true)} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>

                  <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
            <Button className="nav-btn" color="inherit" onClick={handleClickOpen}>{state.language}</Button> 
            <SimpleDialog languages={languages} selectedValue={selectedValue} open={open} onClose={handleClose} />
          </div>
          : null}
        </Toolbar>
        {/* <FormControlLabel
        control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label="huh"
      /> */}
      </AppBar>
    </div>
  );
}

export default NavBar;