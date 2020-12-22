const admin = require('firebase-admin')
const fs = require('fs')
const serviceAccount = require('./euro2021-3d006-firebase-adminsdk-swizj.json')
const { firestoreExport } = require('node-firestore-import-export')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const exportCollection = (collectionName) => {
  firestoreExport(db.collection(collectionName)).then((data) => {
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
