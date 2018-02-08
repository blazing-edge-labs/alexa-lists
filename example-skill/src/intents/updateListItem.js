const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function updateListItem (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('update list item', await listHandler.updateListItem(req.slot('listName'), req.slot('listItemName'), {
    value: req.slot('newListItemName')
  }))
  responder({
    say: [`Updated list item ${req.slot('listItemName')} to ${req.slot('newListItemName')}`]
  }, res)
}

module.exports = updateListItem
