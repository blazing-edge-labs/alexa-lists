const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function updateCustomList (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('update custom list', await listHandler.updateCustomList(req.slot('listName'), {
    name: req.slot('newListName')
  }))
  responder({
    say: [`Updated custom list ${req.slot('listName')}`]
  }, res)
}

module.exports = updateCustomList
