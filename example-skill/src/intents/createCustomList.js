const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function createCustomList (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('create list', await listHandler.createCustomList(req.slot('listName')))
  responder({
    say: [`Created new list called: ${req.slot('listName')}`]
  }, res)
}

module.exports = createCustomList
