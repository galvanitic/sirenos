import React from 'react';
import '../css/tracker.css'

const Tracker = (props) => {
  React.useEffect(() => {
    props.loaderOff()
  }, [props])

  return (
    <div className='tracker-comp'>
      This is the tracker...
    </div>
  );
}

export default Tracker;