const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function deleteListItem (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('delete list item', await listHandler.deleteListItem(req.slot('listName'), req.slot('listItemName')))
  responder({
    say: [`Deleted the list item ${req.slot('listItemName')} from ${req.slot('listName')}`]
  }, res)
}

module.exports = deleteListItem
