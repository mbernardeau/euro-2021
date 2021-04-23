const serviceAccount =
  process.env.REACT_APP_DATABASE === 'LDC'
    ? require('./ssh_keys/ldc-2021-firebase-adminsdk-sek14.json')
    : require('./ssh_keys/euro2021-3d006-firebase-adminsdk-swizj.json')

const directoryDatabase =
  process.env.REACT_APP_DATABASE === 'LDC' ? 'ldc' : 'euro'

module.exports = { serviceAccount, directoryDatabase }
