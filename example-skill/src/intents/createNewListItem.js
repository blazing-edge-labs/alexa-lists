const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function createNewListItem (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('create list item', await listHandler.createNewListItem(req.slot('listName'), req.slot('listItemName')))
  responder({
    say: [`Created new list item ${req.slot('listItemName')} in ${req.slot('listName')}`]
  }, res)
}

module.exports = createNewListItem
