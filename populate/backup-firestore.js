const { serviceAccount, directoryDatabase } = require('./chooseDatabase.js')

const fs = require('fs')
const { backup, initializeApp } = require('firestore-export-import')

initializeApp(serviceAccount)

const exportCollection = (collectionName) => {
  backup(collectionName).then((data) => {
    const jsonData = JSON.stringify(data, null, 2)
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
