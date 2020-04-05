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

export const chLang = (lang_id) => {
  return {
    type: 'CH_LANG',
    value: lang_id
  }
}