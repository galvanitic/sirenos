import React from 'react';
import GoogleMap from 'google-map-react';
import MarkerCluster from '../containers/MarkerCluster';
import galvanite from '../galvanite';
import '../css/tracker.css'

const Map = (props) => {
  const mapRef = React.useRef();

   // get map bounds
   const [bounds, setBounds] = React.useState(null);

  const [center, setCenter] = React.useState({
    lat: 21.1250,
    lng: -101.6860
  });
  const [markers, setMarkers] = React.useState(
    [{position: {
      lat: 32.774989,
      lng: -96.800215
    }},
  ]);
  const [zoom, setZoom] = React.useState(11);

  // React.useEffect(() => {
  //   props.loaderOff()
  // }, [props])
  const onMarkerClick = () => {
    console.log('Marker was clicked.')
  }

  const onMouseOver = () => {
    console.log('Mouse over marker')
  }

  const onMouseOut = () => {
    console.log('Mouse left marker.')
  }

  return (
    <div className='map-container'>
      <GoogleMap
          bootstrapURLKeys={{ key: galvanite.map_api_key }}
          defaultCenter={center}
          defaultZoom={zoom}
          onChange={({zoom, bounds}) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat
            ])
          }}
        >
          <MarkerCluster
          markers={markers}
          click={onMarkerClick}
          mouseover={onMouseOver}
          mouseout={onMouseOut}
        />
        </GoogleMap>
    </div>
  );
}

export default Map;