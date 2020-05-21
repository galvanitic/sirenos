import React from 'react';
import GoogleMap from 'google-map-react';
import useSupercluster from 'use-supercluster';
import galvanite from '../galvanite';
import SirenInfo from '../containers/SirenInfo'
import anchor from '../img/siren-pin-3.png';
import homeAnchor from '../img/siren-pin.png';
import clusterIcon from '../img/m1.png';
import clusterIcon2 from '../img/m3.png';
import clusterIcon3 from '../img/m3.png';
import Popover from '@material-ui/core/Popover';
import '../css/tracker.css'

const Siren = ({children}) => children;

const Map = (props) => {
  const mapRef = React.useRef();
  // map bounds & zoom state
  const [bounds, setBounds] = React.useState(null);
  const [zoom, setZoom] = React.useState(props.uZoom);

  // const [sirenInfoVisible, setSirenInfoVisibility] = React.useState(false);
  const [curSirenProps, setCurSirenProps] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [homeVisible, setHomeVisible] = React.useState(false);
  const [homeE, setHomeE] = React.useState(null);
  const [homeLoaded, setHomeLoaded] = React.useState(false);
  let points;

  if (props.sirens !== null || props.sirens !== undefined){
    // Making GeoJSON datatype
    points = props.sirens.map(siren => ({
      type: "Feature",
      properties: {
        cluster: false, 
        sirenId: siren.siren_id, 
        date: siren.date, 
        address: siren.address, 
        description: siren.description,
        source: siren.source
      },
      geometry: {
        type: "Point",
        coordinates: [
          siren.lng,
          siren.lat
        ]
      }
    }))
  }
  // get clusters
  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {radius: 75, maxZoom: 20}
  });
  
  React.useEffect(() => {
    setZoom(props.uZoom);
    handleHomeMarkerView()
    if(props.addFormVisible && homeE != null){
      setAnchorEl(homeE);
    }
    // If siren was added, reset map
    if(Object.keys(props.sirenRes).length > 0){
      props.updateParentZoom(4.7);
      handleClose();
    }
  }, [props.uZoom, props.addFormVisible, homeE, props.sirenRes])

  // Parent loader
  const triggerLoader = () =>{
    props.triggerMapLoader()
  }

  
  const onMarkerClick = (coords, properties, e) => {
    // console.log(coords)
    props.chActiveGeo(coords[1]+.1, coords[0]);
    props.updateParentZoom(10);
    setCurSirenProps(properties);
    // setSirenInfoVisibility(true);
    if(e) {
      console.log(e.currentTarget)
      setAnchorEl(e.currentTarget);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
    props.hideAddSiren(true)
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onMouseOver = () => {
    console.log('Mouse over marker')
  }

  const onMouseOut = () => {
    console.log('Mouse left marker.')
  }

  const handleHomeMarkerView = () => {
    if (props.initCoords.lat.toFixed(3) === props.activeGeo.lat.toFixed(3) &&
        props.initCoords.lng.toFixed(3) === props.activeGeo.lng.toFixed(3) &&
        zoom === 4.7 && Object.keys(props.currentUsrGeo).length === 0){
      setHomeVisible(false)
    }else if (Object.keys(props.currentUsrGeo).length > 0){
      setHomeVisible(true)
    }
  }

  const HomeMarker = () => {
    if (homeVisible){
      return(
        <Siren key={-1}  lat={props.currentUsrGeo.lat} lng={props.currentUsrGeo.lng}>
          <div key={-1} onLoad={(e)=> setHomeE(e.currentTarget)} className="siren-marker-home">
            <img src={homeAnchor} alt="Your Location" />
          </div>
        </Siren>
      )
    }
  }

  return (
    <div className='map-container'>
      <GoogleMap
          bootstrapURLKeys={{ key: galvanite.map_api_key }}
          defaultCenter={props.initCoords}
          defaultZoom={4.7}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          center={props.activeGeo}
          zoom={props.uZoom}
          center_changed={triggerLoader()}
          onChange={({zoom, bounds, center}) => {
            props.chActiveGeo(center.lat, center.lng)
            // console.log(center)
            props.updateParentZoom(zoom);
            // setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat
            ]);
          }}
          options={{
            styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
              }
            ]
          }}
        >
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <SirenInfo text={props.text} sirenProps={curSirenProps ? curSirenProps : {}} shouldBeVisible={props.addFormVisible} />
          </Popover>
          {HomeMarker()}
          {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster, 
              point_count: pointCount} = cluster.properties;

              // if it's a cluster return this marker
              if (isCluster) {
                if (pointCount < 5){
                  return(
                    <Siren key={cluster.id} lat={latitude} lng={longitude}>
                      <div className="cluster-marker-1">
                        <p>
                          {pointCount}
                        </p>
                        <img src={clusterIcon} alt="Siren Cluster Small" />
                      </div>
                    </Siren>
                  )
                }else if (pointCount >= 5 && pointCount < 15){
                  return(
                    <Siren key={cluster.id} lat={latitude} lng={longitude}>
                      <div className="cluster-marker-2">
                        <p>
                          {pointCount}
                        </p>
                        <img src={clusterIcon2} alt="Siren Cluster Medium" />
                      </div>
                    </Siren>
                  )
                }else if (pointCount >= 15){
                  return(
                    <Siren key={cluster.id} lat={latitude} lng={longitude}>
                      <div className="cluster-marker-3">
                        <p>
                          {pointCount}
                        </p>
                        <img src={clusterIcon3} alt="Siren Cluster Alert" />
                      </div>
                    </Siren>
                  )
                }
              }

              return(
                <Siren key={cluster.properties.sirenId} lat={latitude} lng={longitude}>
                  <button key={cluster.properties.sirenId} onClick={(e) => onMarkerClick(cluster.geometry.coordinates, cluster.properties, e)} className="siren-marker">
                    <img src={anchor} alt="Siren Location" />
                  </button>
                </Siren>
              )
          })}
        </GoogleMap>
    </div>
  );
}

export default Map;