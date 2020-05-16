import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TimeLine from '../containers/TimeLine';
import Moment from 'react-moment';
import moment from 'moment'
import Map from '../containers/Map';
import '../css/tracker.css';

const Tracker = (props) => {
  // const [siren, mountSiren] = React.useState(null);
  // const [siren_id, select_siren_id] = React.useState(null)
  const [start, setStart] = React.useState(moment().subtract(1, 'years').format("YYYY-MM-DDTHH:mm:ss"));
  const [end, setEnd] = React.useState(moment().format("YYYY-MM-DDTHH:mm:ss"));

  React.useEffect(() => {
    props.loaderOff();
    if(start !== null && end !== null){
      props.fetchSirens(start.replace("T", "+"), end.replace("T", "+"));
    }
  }, [start, end])

  const handleSearch = (e) => {
    // select_siren_id(e.target.value)
  }
  const handleStartChange = (date) => {
    setStart(moment(date).format("YYYY-MM-DDTHH:mm:ss"));
  }
  const handleEndChange = (date) => {
    setEnd(moment(date).format("YYYY-MM-DDTHH:mm:ss"));
  }

  return (
    <div className='tracker-comp'>
      <form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
            margin="normal"
            id="start-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={new Date(start)}
            onChange={handleStartChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}/>
            <KeyboardDatePicker
            margin="normal"
            id="end-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={new Date(end)}
            onChange={handleEndChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}/>
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
      {console.log(props.sirens)}
      
      <Map />
    </div>
  );
}

export default Tracker;