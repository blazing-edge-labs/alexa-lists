const _ = require('lodash')
const Alexa = require('alexa-app').app

const {NODE_ENV} = process.env
const app = new Alexa()

app.error = function (err, req, res) {
  console.error(err)
  res.say('There was an error!').send()
}

app.launch(function (req, res) {
  res.say('Launch!').shouldEndSession(false).send()
})

app.intent('AMAZON.StopIntent', function (req, res) {
  res.say('Bye').send()
})

// custom intents go here
const allCustomIntents = [{
  intentName: 'getListMetadataIntent',
  intentFn: require('src/intents/getListMetadata')
}, {
  intentName: 'getListIntent',
  intentFn: require('src/intents/getList')
}, {
  intentName: 'createCustomListIntent',
  intentFn: require('src/intents/createCustomList')
}, {
  intentName: 'createNewListItemIntent',
  intentFn: require('src/intents/createNewListItem')
}, {
  intentName: 'deleteCustomListIntent',
  intentFn: require('src/intents/deleteCustomList')
}, {
  intentName: 'deleteListItemIntent',
  intentFn: require('src/intents/deleteListItem')
}, {
  intentName: 'getListItemIntent',
  intentFn: require('src/intents/getListItem')
}, {
  intentName: 'updateCustomListIntent',
  intentFn: require('src/intents/updateCustomList')
}, {
  intentName: 'updateListItemIntent',
  intentFn: require('src/intents/updateListItem')
}]

_.forEach(allCustomIntents, function (customIntentData) {
  app.intent(customIntentData.intentName, customIntentData.intentFn)
})

if (NODE_ENV === 'development') {
  const express = require('express')
  const expressApp = express()

  const {HOST, PORT} = process.env

  app.express({
    expressApp,
    endpoint: '/',
    debug: true
  })
  expressApp.listen(PORT, HOST, function () {
    console.log(`
      App listening on ${HOST}:${PORT}
    `)
  })
}

exports.app = app
// The handler is used by aws lambda
exports.handler = app.lambda()
