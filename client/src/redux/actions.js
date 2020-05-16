const sirensurl = "http://localhost:4001/sirens";
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
  return {
    type: 'ADD_SIREN',
    value: siren
  }
}

export const rmSiren = (id) => {
  return {
    type: 'RM_SIREN',
    value: id
  }
}
