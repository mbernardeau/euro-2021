const { serviceAccount, directoryDatabase } = require('./chooseDatabase.js')

const fs = require('fs')
const { backup, initializeFirebaseApp } = require('firestore-export-import')
var stringify = require('json-stable-stringify')

initializeFirebaseApp(serviceAccount)

const exportCollection = (collectionName) => {
  backup(collectionName).then((data) => {
    const jsonData = stringify(data, { space: 3 })
    fs.writeFile(
      `./firestore-data/${directoryDatabase}/${collectionName}.json`,
      jsonData,
      'utf8',
      (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(`Export for ${collectionName} complete`)
      },
    )
  })
}

exportCollection('matches')
exportCollection('teams')
exportCollection('stadiums')
