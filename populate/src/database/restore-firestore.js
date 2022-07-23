const { serviceAccount, directoryDatabase } = require('../chooseDatabase.js')

const { restore, initializeFirebaseApp } = require('firestore-export-import')

initializeFirebaseApp(serviceAccount)

const options = {
  autoParseDates: true,
}

const importCollection = (collectionName) => {
  restore(
    `./firestore-data/${directoryDatabase}/${collectionName}.json`,
    options,
  ).then(() => console.log(`Collection ${collectionName} was imported`))
}

importCollection('matches')
importCollection('teams')
importCollection('stadiums')
