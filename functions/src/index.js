const admin = require('firebase-admin')
admin.initializeApp()

const { updateScore } = require('./updateScore')
const users = require('./users')
const groups = require('./groups')

exports.updateScore = updateScore
exports.users = users
exports.groups = groups
