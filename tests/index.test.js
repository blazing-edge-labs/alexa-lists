const _ = require('lodash')
const nock = require('nock')
const tests = require('tape')

const alexaLists = require('../index')
const fixtures = require('./fixtures')

const amazonHost = 'https://api.amazonalexa.com'
const dummyToken = 'someAlexaAPIToken'

tests('Should get the permissions card', function (test) {
  test.same(alexaLists.getPermissionsCard(), {
    type: 'AskForPermissionsConsent',
    permissions: [
      'read::alexa:household:list',
      'write::alexa:household:list'
    ]
  })
  test.end()
})

tests('Should create a custom list', async function (test) {
  nock(amazonHost)
  .post('/v2/householdlists/')
  .reply(200, fixtures.emptyList)

  const response = await alexaLists.init(dummyToken).createCustomList('new list')
  test.same(response, fixtures.emptyList)
  test.end()
})

tests('Should create a new list item', async function (test) {
  let sentBody

  nock(amazonHost)
  .get('/v2/householdlists/')
  .reply(200, {lists: fixtures.listMetadata})

  nock(amazonHost)
  .get('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/active')
  .reply(200, fixtures.list)

  nock(amazonHost)
  .post('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/items/')
  .reply(200, function (uri, reqBody) {
    sentBody = reqBody
    return fixtures.listItem
  })

  const response = await alexaLists.init(dummyToken).createNewListItem('blazing list', 'melons')
  test.same(response, fixtures.listItem)
  test.same(sentBody, {
    value: 'melons',
    status: 'active'
  })
  test.end()
})

tests('Should delete custom list', async function (test) {
  nock(amazonHost)
  .get('/v2/householdlists/')
  .reply(200, {lists: fixtures.listMetadata})

  nock(amazonHost)
  .delete('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701')
  .reply(200, fixtures.list)

  const response = await alexaLists.init(dummyToken).deleteCustomList('blazing list')
  test.same(response, fixtures.list)
  test.end()
})

tests('Should delete list item', async function (test) {
  nock(amazonHost)
  .get('/v2/householdlists/')
  .reply(200, {lists: fixtures.listMetadata})

  nock(amazonHost)
  .get('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/active')
  .reply(200, fixtures.list)

  nock(amazonHost)
  .delete('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/items/479e479e-479e-479e-479e-479e479e4791')
  .reply(200, fixtures.listItem)

  const response = await alexaLists.init(dummyToken).deleteListItem('blazing list', 'melons')
  test.same(response, fixtures.listItem)
  test.end()
})

tests('Should get the proper list', async function (test) {
  nock(amazonHost)
  .get('/v2/householdlists/')
  .reply(200, {lists: fixtures.listMetadata})

  nock(amazonHost)
  .get('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/active')
  .reply(200, fixtures.list)

  const response = await alexaLists.init(dummyToken).getList('blazing list')
  test.same(response, fixtures.list)
  test.end()
})

tests('Should get the proper list item', async function (test) {
  nock(amazonHost)
  .get('/v2/householdlists/')
  .reply(200, {lists: fixtures.listMetadata})

  nock(amazonHost)
  .get('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/active')
  .reply(200, fixtures.list)

  nock(amazonHost)
  .get('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/items/479e479e-479e-479e-479e-479e479e4791')
  .reply(200, fixtures.listItem)

  const response = await alexaLists.init(dummyToken).getListItem('blazing list', 'melons')
  test.same(response, fixtures.listItem)
  test.end()
})

tests('Should get list metadata', async function (test) {
  nock(amazonHost)
  .get('/v2/householdlists/')
  .reply(200, {
    lists: fixtures.listMetadata
  })

  const response = await alexaLists.init(dummyToken).getListMetadata()
  test.same(response, fixtures.listMetadata)
  test.end()
})

tests('Should update custom list name and state', async function (test) {
  let sentBody

  nock(amazonHost)
  .get('/v2/householdlists/')
  .reply(200, {
    lists: fixtures.listMetadata
  })

  nock(amazonHost)
  .put('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701')
  .reply(200, function (uri, reqBody) {
    sentBody = reqBody

    return _.assign({}, fixtures.list, reqBody)
  })

  const updateBody = {
    name: 'some new list name',
    state: 'completed'
  }
  const response = await alexaLists.init(dummyToken).updateCustomList('blazing list', updateBody)
  const newList = _.assign({}, fixtures.list, updateBody)
  test.same(response, newList)
  test.same(sentBody, _.assign({}, updateBody, {version: 1}))
  test.end()
})

tests('Should update custom list item', async function (test) {
  let sentBody

  nock(amazonHost)
  .get('/v2/householdlists/')
  .reply(200, {
    lists: fixtures.listMetadata
  })

  nock(amazonHost)
  .get('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/active')
  .reply(200, fixtures.list)

  nock(amazonHost)
  .put('/v2/householdlists/479e479e-479e-479e-479e-479e479e4701/items/479e479e-479e-479e-479e-479e479e4791')
  .reply(200, function (uri, reqBody) {
    sentBody = reqBody

    return _.assign({}, fixtures.listItem, reqBody)
  })

  const updateBody = {
    value: 'orange',
    status: 'completed'
  }
  const response = await alexaLists.init(dummyToken).updateListItem('blazing list', 'melons', updateBody)
  test.same(response, _.assign({}, fixtures.listItem, updateBody))
  test.same(sentBody, _.assign({}, updateBody, {version: 1}))
  nock.restore()
  test.end()
})
