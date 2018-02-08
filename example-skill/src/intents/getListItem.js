const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function getListItem (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('get list item', await listHandler.getListItem(req.slot('listName'), req.slot('listItemName')))
  responder({
    say: [`Got list item ${req.slot('listItemName')} from ${req.slot('listItem')}`]
  }, res)
}

module.exports = getListItem
