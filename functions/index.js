/* eslint-disable no-console */
const admin = require('firebase-admin')
admin.initializeApp()

const { updateScore } = require('./updateScore')
const { onUserCreate, onUserUpdate } = require('./syncUserWithOpponent')

exports.updateScore = updateScore
exports.onUserCreate = onUserCreate
exports.onUserUpdate = onUserUpdate
