const fs = require('fs')
const serviceAccount = require('./euro2021-3d006-firebase-adminsdk-swizj.json')
const { backup, initializeApp } = require('firestore-export-import')

initializeApp(serviceAccount)

const exportCollection = (collectionName) => {
  backup(collectionName).then((data) => {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFile(
      `./firestore-data/${collectionName}.json`,
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
