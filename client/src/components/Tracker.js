import React from 'react';
import galvanite from '../galvanite';
import geocoder from 'google-geocoder';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// import TimeLine from '../containers/TimeLine';
import moment from 'moment'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import Alert from '@material-ui/lab/Alert';
import Zoom from '@material-ui/core/Zoom';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchIcon from '@material-ui/icons/Search';
import Map from '../containers/Map';
import languages from '../languages';
import cookie from 'cookie';
import '../css/tracker.css';

// This component is very long and could be decomposed better but... that's for later.
const Tracker = (props) => {
  const [mapLoader, setMapLoader] = React.useState(true);
  const cookies = cookie.parse(document.cookie);
  let initCoords = {lat: 38.4069616, lng: -99.1820657};
  var geo = geocoder({
    key: galvanite.map_api_key
  })
  const [uZoom, setuZoom] = React.useState(null);
  const [tempAddress, setTempAddress] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [auth, setAuth] = React.useState(false);
  const [text, setText] = React.useState(null);
  const [start, setStart] = React.useState(moment().subtract(1, 'years').format("YYYY-MM-DDTHH:mm:ss"));
  const [end, setEnd] = React.useState(moment().format("YYYY-MM-DDTHH:mm:ss"));
  const [sirenInfoVisible, setSirenInfoVisibility] = React.useState(false);

  const [errViewable, setErrViewable] = React.useState(false);
  const [err1, setErr1] = React.useState(false);
  const [err2, setErr2] = React.useState(false);
  const [err3, setErr3] = React.useState(false);
  const [err4, setErr4] = React.useState(false);
  const [err5, setErr5] = React.useState(false);

  React.useEffect(() => {
    //call function to set component data
    checkAuth()
    props.chActiveGeo(initCoords.lat, initCoords.lng);
    props.loaderOff();
    if(start !== null && end !== null){
      props.fetchSirens(start.replace("T", "+"), end.replace("T", "+"));
    }
  }, [start, end, props.language, cookies["lang_id"]]);

  const checkAuth = () => {
    if(props.language != null){
      // if data is in redux, use it.
      setText(languages.types[props.language].tracker);
      setAuth(true)
    } else if (cookies["lang_id"] >= 0){
      // if data is in cookie, use it.
      setText(languages.types[cookies["lang_id"]].tracker);
      setAuth(true)
    }else {
      setAuth(false);
    }
  }

  // Function to handle child updating zoom
  const handleZoom = (newZoom) => {
    setuZoom(newZoom)
  }

  // Function for loader
  const handleMapLoader = () => {
    setTimeout(function(){setMapLoader(false)}, 5000)
    // console.log(`Map loader is ${mapLoader}`);
  }

  // Functions to handle date change
  const handleStartChange = (date) => {
    setStart(moment(date).format("YYYY-MM-DDTHH:mm:ss"));
  }
  const handleEndChange = (date) => {
    setEnd(moment(date).format("YYYY-MM-DDTHH:mm:ss"));
  }

  // Functions to handle fetching user location
  const handleGeoActivate = () => {
    setMapLoader(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition,showError);
    } else {
      setErr1(true);
    }
  }
  const setPosition = (position) => {
    props.chActiveGeo(position.coords.latitude, position.coords.longitude)
    props.chCurrentUsrGeo(position.coords.latitude, position.coords.longitude)
    setuZoom(17);
  }
  const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setErr2(true);
        setErrViewable(true);
        setTimeout(function() {setErrViewable(false)}, 7000);
        break;
      case error.POSITION_UNAVAILABLE:
        setErr3(true);
        setErrViewable(true);
        setTimeout(function() {setErrViewable(false)}, 7000);
        break;
      case error.TIMEOUT:
        setErr4(true);
        setErrViewable(true);
        setTimeout(function() {setErrViewable(false)}, 7000);
        break;
      case error.UNKNOWN_ERROR:
        setErr5(true);
        setErrViewable(true);
        setTimeout(function() {setErrViewable(false)}, 7000);
        break;
    }
  }

  //Functions to handle address input
  const handleAddressInput = (e) => {
    setTempAddress(e.target.value)
  }
  const handleAddressKeyEnter = (e) => {
    if(e.key === 'Enter'){
      setTempAddress(e.target.value)
      handleAddressSearch()
    }
  }
  const handleAddressSearch = () => {
    geo.find(tempAddress, function(err, res){
      if (tempAddress !== ""){
        if(res.length >= 1) {
          props.chActiveGeo(res[0].location.lat, res[0].location.lng);
          props.chCurrentUsrGeo(res[0].location.lat, res[0].location.lng);
          setuZoom(17);
          // console.log(res[0]);
        }else {
          console.log('Something happened.');
        }
      }else {
        console.log("There's nothing in the address field...")
      }
    })
  }

  const handleAddSiren = () => {
    setSirenInfoVisibility(true)
    props.chActiveGeo(props.currentUsrGeo.lat+.0009, props.currentUsrGeo.lng);
    setuZoom(17);
  }

  const handleAddSirenSetHidden = () => {
    setSirenInfoVisibility(false);
  }

  const addSirenBtn = () => {
    if(Object.keys(props.currentUsrGeo).length > 0){
      return(
        <Button id="makeSirenBttn" variant="contained" color="secondary" onClick={handleAddSiren}>
          <AddLocationIcon id="locIcon" />
            {auth ? text.makeSiren : null}
        </Button>
        )
    }else {
      return(
        <Button id="makeSirenBttnDisabled" color="secondary" disabled>
          <AddLocationIcon id="locIcon" />
            {auth ? text.makeSiren : null}
        </Button>
      )
    }
  }


  return (
    <div className='tracker-comp'>
      {/* {console.log(props.activeGeo)} */}
       <Paper className="tracker-bg">
         {mapLoader ? <LinearProgress className="loader" color="secondary" variant="query" /> : <div className="loader" />}
        <form className="tracker-form" noValidate autoComplete="off">
          <p id="search-by-date">
            {auth ? text.searchByDate : null}
          </p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid className="date-grid">
              <KeyboardDatePicker
              margin="normal"
              id="start-picker-dialog"
              label={auth ? text.from : "null"}
              format="MM/dd/yyyy"
              value={new Date(start)}
              onChange={handleStartChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}/>
              <span className="horSpace"></span>
              <KeyboardDatePicker
              margin="normal"
              id="end-picker-dialog"
              label={auth ? text.to : "null"}
              format="MM/dd/yyyy"
              value={new Date(end)}
              onChange={handleEndChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}/>
            </Grid>
          </MuiPickersUtilsProvider>
          <span className="separator"></span>
          <p id="near-you">
            {auth ? text.searchAroundYou : null}
          </p>
          
          <div className="address-container">
            <TextField onKeyPress={handleAddressKeyEnter} onChange={handleAddressInput} id="outlined-basic" value={tempAddress} label={auth ? text.address : "Address"} variant="outlined" />
            <Button onClick={handleAddressSearch} variant="contained" id="searchAddress" color="primary">
              <SearchIcon />
            </Button>
          </div>

          <div className="or-separator">
            <span />
            <p>
              {auth ? text.or : null}
            </p>
            <span />
          </div>

          <Button id="locBttn" variant="contained" color="primary" onClick={handleGeoActivate}>
            <LocationOnIcon id="locIcon" />
            {auth ? text.useLocation : null}
          </Button>

          <span className="separator-2"></span>
          
          {addSirenBtn()}
        </form>
       </Paper>

       {/* Here we render the map */}
      <Map text={text} hideAddSiren={handleAddSirenSetHidden} updateParentZoom={handleZoom} initCoords={initCoords} uZoom={uZoom} triggerMapLoader={handleMapLoader} addFormVisible={sirenInfoVisible}/>

      {/* Alerts compnent */}
      <Zoom in={errViewable}>  
        <div className="alerts">
          {err1 ? <Alert severity="error">{text.geoErr[0]}</Alert> : null}
          {err2 ? <Alert severity="error">{text.geoErr[1]}</Alert> : null}
          {err3 ? <Alert severity="error">{text.geoErr[2]}</Alert> : null}
          {err4 ? <Alert severity="error">{text.geoErr[3]}</Alert> : null}
          {err5 ? <Alert severity="error">{text.geoErr[4]}</Alert> : null}
        </div>
      </Zoom>
    </div>
  );
}

export default Tracker;