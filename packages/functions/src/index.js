const admin = require('firebase-admin')
admin.initializeApp()

const { updateScore } = require('./updateScore')
const users = require('./users')
const groups = require('./groups')
const notifications = require('./notifications')

exports.updateScore = updateScore
exports.users = users
exports.groups = groups
exports.notifications = notifications
