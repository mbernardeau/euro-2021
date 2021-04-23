# Populate Script

This is a script to populate database based on CSV files.

To install dependencies:

```bash
cd populate
yarn
// or
npm i
```

To be able to connect to the database with admin rights, you need to get the firebase admin SDK configuration from Firebase console.
Go to `Settings/Project/Service account/Firebase admin SDK` in Firebase console. Then click on `Generate new private key`.

Then put the correct link to the generated file in `populate.js`, at the serviceAccount import.
