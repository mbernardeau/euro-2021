const stagingConfig = {
  apiKey: 'AIzaSyDhYtLgdmUJS08BUl0bN3LHxND5a-KId7g',
  authDomain: 'euro2021-3d006.firebaseapp.com',
  databaseURL: 'https://euro2021-3d006.firebaseio.com',
  projectId: 'euro2021-3d006',
  storageBucket: 'euro2021-3d006.appspot.com',
  messagingSenderId: '227571739008',
  appId: '1:227571739008:web:6024da3fda61ac0cb13965',
  measurementId: 'G-VHC3B020NE',
}

const productionConfig = {
  // Todo later
}

if (process.env.DATABASE === 'PRODUCTION') {
  module.exports = productionConfig
} else {
  module.exports = stagingConfig
}
