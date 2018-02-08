const _ = require('lodash')
const alexaLists = require('@blazingedge/alexa-lists')

const responder = require('src/utils/responder')

async function getListMetadata (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  console.log('list metadata', await listHandler.getListMetadata())
  responder({
    say: ['Got the list metadata!']
  }, res)
}

module.exports = getListMetadata
