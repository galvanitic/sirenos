import React from 'react';
import '../css/tracker.css'

const TimeLine = (props) => {
  React.useEffect(() => {
    props.loaderOff()
  }, [props])

  return (
    <div className='timeline-container'>
      This is the timeline...
    </div>
  );
}

export default TimeLine;