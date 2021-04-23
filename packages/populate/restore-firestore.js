const { serviceAccount, directoryDatabase } = require('./chooseDatabase.js')

const { restore, initializeApp } = require('firestore-export-import')

initializeApp(serviceAccount)

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
