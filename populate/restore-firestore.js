const serviceAccount = require('./euro2021-3d006-firebase-adminsdk-swizj.json')
const { restore, initializeApp } = require('firestore-export-import')

initializeApp(serviceAccount)

const options = {
  autoParseDates: true,
}

const importCollection = (collectionName) => {
  restore(`./firestore-data/${collectionName}.json`, options).then(() =>
    console.log(`Collection ${collectionName} was imported`),
  )
}

importCollection('matches')
importCollection('teams')
importCollection('stadiums')
