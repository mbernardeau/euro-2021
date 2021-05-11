const stagingConfig = {
  apiKey: 'AIzaSyDhYtLgdmUJS08BUl0bN3LHxND5a-KId7g',
  authDomain: 'euro2021-3d006.firebaseapp.com',
  databaseURL: 'https://euro2021-3d006.firebaseio.com',
  projectId: 'euro2021-3d006',
  storageBucket: 'euro2021-3d006.appspot.com',
  messagingSenderId: '227571739008',
  appId: '1:227571739008:web:6024da3fda61ac0cb13965',
  measurementId: 'G-VHC3B020NE',
  vapidKey:
    'BNFLkkL8ftMrBv1GfbDSyhoC9swL_XH-CVLTcLaEhGUdGY6iLoBQnKoRLdGgKsld7seb-kp4SJPISxKe1xDKvW8',
}

const ldcConfig = {
  apiKey: 'AIzaSyBognDFE_L5JZUiOR_vHj8mSlVybQO899s',
  authDomain: 'ldc-2021.firebaseapp.com',
  projectId: 'ldc-2021',
  storageBucket: 'ldc-2021.appspot.com',
  messagingSenderId: '744163541832',
  appId: '1:744163541832:web:1cb95dd1f96bba42f3297d',
  vapidKey:
    'BHXcFN6iJXJxTFGOmCCrR-Jxsx6_A3I4WEGP2yyWCQqj1BEGTIGtyvZB_2ihUcXXezvknHqNovIEq2wmV-mib70',
}

const productionConfig = {
  apiKey: 'AIzaSyBO9Ln1ZGwk2w3-DaoBLc1cPBgxXwB5B3I',
  authDomain: 'euro-2021-prod.firebaseapp.com',
  projectId: 'euro-2021-prod',
  storageBucket: 'euro-2021-prod.appspot.com',
  messagingSenderId: '36611696942',
  appId: '1:36611696942:web:23dceaa163bab62e2ab2bf',
}

if (process.env.REACT_APP_DATABASE === 'PRODUCTION') {
  module.exports = productionConfig
} else if (process.env.REACT_APP_DATABASE === 'LDC') {
  module.exports = ldcConfig
} else {
  module.exports = stagingConfig
}
