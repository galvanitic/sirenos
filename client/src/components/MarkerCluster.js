import React from 'react';
import PropTypes from 'prop-types';
import MarkerClusterer from '@google/markerclustererplus';
import anchor from '../img/anchor-512.png';
import '../css/tracker.css'

const evtNames = [
  'click',
  'dblclick',
  'dragend',
  'mousedown',
  'mouseout',
  'mouseover',
  'mouseup',
  'recenter',
];

const MarkerCluster = (props) => {
  const {map, google, markers} = props;

  const handleEvent = ({event, marker, entry}) => {
    if (props[event]) {
      props[event]({
        props: props,
        marker: marker,
        event: event,
        entry: entry
      })
    }
  }

  React.useEffect(() => {
    if (map && markers) {
      const mapMarkers = markers.map((marker) => {
        const entry = new google.maps.Marker({
          position: {
            lat: marker.position.lat,
            lng: marker.position.lng
          },
          map: map,
          name: marker.name
        })
        
        evtNames.forEach(e => {
          entry.addListener(e, () => handleEvent({
            event: e,
            marker: marker,
            entry: entry
          }))
        })
        
        return entry
      })
      
      const clusterer = new MarkerClusterer(map, mapMarkers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
      
      // Cleanup function. Note, this is only returned if we create the markers
      return () => {
        //console.log('Cleaning up markers')
        clusterer.clearMarkers()
      }
    }
  }, [map, google, markers])

  return (null)
}

MarkerCluster.propTypes = {
  map: PropTypes.object,
  google: PropTypes.object,
  markers: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  })),
}

export default MarkerCluster;