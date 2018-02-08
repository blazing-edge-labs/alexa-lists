const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function deleteCustomList (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('delete list', await listHandler.deleteCustomList(req.slot('listName')))
  responder({
    say: [`Deleted the list'${req.slot('listName')}`]
  }, res)
}

module.exports = deleteCustomList
