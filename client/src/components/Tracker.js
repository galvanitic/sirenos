import React, { Component } from 'react';

const Tracker = (props) => {
  React.useEffect(() => {
    props.loaderOff()
  }, [props.loaderOff()])

  return (
    <div>
      This is the tracker...
    </div>
  );
}

export default Tracker;