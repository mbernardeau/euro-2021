const { serviceAccount } = require('./chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const email = process.argv[2]

const addCustomClaim = async () => {
  const user = await admin.auth().getUserByEmail(email)

  if (user.customClaims && user.customClaims.role === 'admin') {
    console.log(
      `${user.displayName} (${email}) already has the admin role. Nothing to do.`,
    )
    return
  }

  await admin.auth().setCustomUserClaims(user.uid, {
    ...user.customClaims,
    role: 'admin',
  })

  console.log(`Admin role successfully added to ${user.displayName} (${email})`)
}

if (!email) {
  console.log(`Usage: node ./addUserAdmin email@example.com`)
  process.exit(1)
}

addCustomClaim()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .then(() => process.exit(0))
