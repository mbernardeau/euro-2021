/* eslint-disable no-console */
const admin = require('firebase-admin')
admin.initializeApp()

const { updateScore } = require('./updateScore')
const { onUserCreate, onUserUpdate } = require('./syncUserWithOpponent')
const { applyInGroup } = require('./applyInGroup')
const { validApply } = require('./validApply')

exports.updateScore = updateScore
exports.onUserCreate = onUserCreate
exports.onUserUpdate = onUserUpdate
exports.applyInGroup = applyInGroup
exports.validApply = validApply
