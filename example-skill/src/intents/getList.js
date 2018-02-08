const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function getList (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('get list', await listHandler.getList(req.slot('listName')))
  responder({
    say: ['Got the list!']
  }, res)
}

module.exports = getList
