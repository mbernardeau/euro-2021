const serviceAccount = require('./ldc-2021-firebase-adminsdk-sek14-c92158b256.json')
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

importCollection('matches_ldc')
importCollection('teams_ldc')
importCollection('stadiums')
