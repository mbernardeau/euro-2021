const stagingConfig = {
  apiKey: 'AIzaSyBqwxcPPEW5SQRYX039izgmJMWiktauCkg',
  authDomain: 'pronostics-47048.firebaseapp.com',
  databaseURL: 'https://pronostics-47048.firebaseio.com',
  projectId: 'pronostics-47048',
  storageBucket: 'pronostics-47048.appspot.com',
  messagingSenderId: '1000074404628',
}

const productionConfig = {
  apiKey: 'AIzaSyDZTW2Ajr00aTJnChjawIaVJrYH0kxpcTs',
  authDomain: 'road-to-russia-540bf.firebaseapp.com',
  databaseURL: 'https://road-to-russia-540bf.firebaseio.com',
  projectId: 'road-to-russia-540bf',
  storageBucket: 'road-to-russia-540bf.appspot.com',
  messagingSenderId: '838430707739',
}

if (process.env.DATABASE === 'PRODUCTION') {
  module.exports = productionConfig
} else {
  module.exports = stagingConfig
}
