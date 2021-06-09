import * as functions from 'firebase-functions'
import { v1 } from '@google-cloud/firestore'
import { Storage } from '@google-cloud/storage'
import { EU_WEST_3 } from '../constants'

const client = new v1.FirestoreAdminClient()

const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT

if (!projectId) {
  throw new Error("projectId can't be found")
}

const bucketName = `gs://${projectId}-backups`

exports.scheduledFirestoreExport = functions
  .region(EU_WEST_3)
  .pubsub.schedule('59 23 * * *')
  .timeZone('Europe/Paris')
  .onRun(async () => {
    const storage = new Storage()
    const bucket = storage.bucket(bucketName)

    if (!(await bucket.exists())) {
      console.warn(
        `Bucket ${bucketName} does not exist. No backup save will be stored.`,
      )
      return
    }

    const databaseName = client.databasePath(projectId, '(default)')

    const [operation] = await client.exportDocuments({
      name: databaseName,
      outputUriPrefix: bucketName,
      collectionIds: [],
    })

    const [response] = await operation.promise()

    console.log(`Backup operation successful to ${response.outputUriPrefix}`)
  })
