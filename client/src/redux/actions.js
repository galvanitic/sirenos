const sirensurl = "http://0.0.0.0:4001/sirens";
const axios = require('axios');

export const chLang = (index) => {
  return {
    type: 'CH_LANG',
    value: index
  }
}

export const loaderOn = () => {
  return {
    type: 'LOADER_ON',
    value: null
  }
}

export const loaderOff = () => {
  return {
    type: 'LOADER_OFF',
    value: null
  }
}

export const chCurrentUsrGeo = (lat, lng) => {
  return {
    type: 'CH_CUR_USR_GEO',
    value: {
      lat: lat,
      lng: lng
    }
  }
}
export const chActiveGeo = (lat, lng) => {
  return {
    type: 'CH_ACTIVE_GEO',
    value: {
      lat: lat,
      lng: lng
    }
  }
}

export const fetchSirens = (start, end) => {
  // type: 'FETCH_SIRENS',
  // Example: http://localhost:4001/sirens/range/2020-01-01+00:00:00/2021-01-01+00:00:00
  return(dispatch) => {
    axios.get(`${sirensurl}/range/${start}/${end}`)
    .then(res => {
      const action = {
        type: 'FETCH_SIRENS',
        value: res.data
      }
      dispatch(action);
    }).catch(err => {
      console.log(err);
    })
  }
}

// export const fetchSiren = (siren_id) => {
//   return(dispatch) => {
//     axios.get(`${sirensurl}/id/${siren_id}`)
//     .then(siren => {
//       const action = {
//         type: 'FETCH_SIREN',
//         value: siren
//       }
//       dispatch(action);
//     }).catch(err => {
//       console.log(err);
//     })
//   }
// }

export const addSiren = (siren) => {
  return(dispatch) => {
    axios.post(`${sirensurl}/`, siren)
    .then(function(res){
      const action = {
        type: 'ADD_SIREN',
        value: res
      }
      dispatch(action)
    })
  }
}

export const resetRes = () => {
  return{
    type: 'RESET_RES',
    value: {}
  }
}

export const rmSiren = (id) => {
  return {
    type: 'RM_SIREN',
    value: id
  }
}
