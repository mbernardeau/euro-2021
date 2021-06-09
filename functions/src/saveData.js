const functions = require('firebase-functions')
const firestore = require('@google-cloud/firestore')
const client = new firestore.v1.FirestoreAdminClient()

const bucket = `gs://${process.env.GCLOUD_PROJECT}-backups`

exports.scheduledFirestoreExport = functions.pubsub
  .schedule('59 23 * * *')
  .timeZone('Europe/Paris')
  .onRun((context) => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT
    const databaseName = client.databasePath(projectId, '(default)')

    return client
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ['users', 'posts']
        collectionIds: [],
      })
      .then((responses) => {
        const response = responses[0]
        console.log(`Operation Name: ${response['name']}`)
      })
      .catch((err) => {
        console.error(err)
        throw new Error('Export operation failed')
      })
  })
