export const chLang = (index) => {
  return {
    type: 'CH_LANG',
    value: index
  }
}
export const fetchSirens = () => {
  return  {
    type: 'FETCH_SIRENS',
    value: null
  }
}

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
