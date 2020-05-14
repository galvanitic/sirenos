import React from 'react';
import TimeLine from '../containers/TimeLine';
import Map from '../containers/Map';
import '../css/tracker.css';

const Tracker = (props) => {
  const [siren, mountSiren] = React.useState(null);
  const [siren_id, select_siren_id] = React.useState(null)

  React.useEffect(() => {
    props.loaderOff();
    if(siren_id !== null){
      // mountSiren(props.fetchSiren(siren_id))
    }
  }, [props, siren_id, select_siren_id, props.fetchSiren])

  const handleSearch = (e) => {
    select_siren_id(e.target.value)
  }

  return (
    <div className='tracker-comp'>
      {/* <TimeLine /> */}
        {/* <p>{props.fetchSiren(10)}</p> */}
      <div>
        <input placeholder='temp id here' name='searchById' onChange={handleSearch}></input>
      </div>
      {console.log(siren_id)}
      
      <Map />
    </div>
  );
}

export default Tracker;