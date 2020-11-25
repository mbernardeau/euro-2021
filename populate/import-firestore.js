const admin = require('firebase-admin')
const fs = require('fs')
const serviceAccount = require('./pronostics-47048-firebase-adminsdk-5jyex-2c08d51542')
const { firestoreExport } = require('node-firestore-import-export')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pronostics-47048.firebaseio.com',
})

const db = admin.firestore()

const exportCollection = collectionName => {
  firestoreExport(db.collection(collectionName)).then(data => {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFile(`./firestore-data/${collectionName}.json`, jsonData, 'utf8', err => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`Export for ${collectionName} complete`)
    })
  })
}

exportCollection('matches')
exportCollection('teams')
exportCollection('stadiums')
