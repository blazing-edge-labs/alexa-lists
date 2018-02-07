const _ = require('lodash')
const got = require('got')

const routes = require('./routes')
const utils = require('./utils')
const validate = require('./validate')

function getPermissionsCard () {
  return {
    type: 'AskForPermissionsConsent',
    permissions: [
      'read::alexa:household:list',
      'write::alexa:household:list'
    ]
  }
}

function makeRequest (apiToken) {
  return function _makeRequest (routeObj, body = {}) {
    const options = _.assign({body}, routeObj.options, {
      headers: {
        Authorization: `Bearer ${apiToken}`
      },
      json: true
    })
    return got(routeObj.url, options)
  }
}

function init (token) {
  const makeRequestFn = makeRequest(token)

  function createCustomList (listName) {
    validate.listName(listName)

    const body = {
      name: listName,
      state: 'active'
    }
    return makeRequestFn(routes.createCustomList(), body)
  }

  function createNewListItem (listName, listItemName, status = 'active') {
    validate.listItemName(listItemName)

    return getList(listName, status)
    .then(function (list) {
      const body = {
        value: listItemName,
        status
      }
      return makeRequestFn(routes.createNewListItem(list.listId), body)
    })
    .catch(console.error)
  }

  function deleteCustomList (listName) {
    validate.listName(listName)

    return getListMetadata()
    .then(function (lists) {
      const list = utils.findSpecificListName(lists, listName)

      if (!list) {
        throw Error('List not found!')
      }
      return makeRequestFn(routes.deleteCustomList(list.listId))
    })
    .catch(console.error)
  }

  function deleteListItem (listName, listItemName, status = 'active') {
    validate.listItemName(listItemName)

    return getList(listName, status)
    .then(function (lists) {
      const list = utils.findSpecificListName(lists, listName, status)

      if (!list) {
        throw Error('List not found!')
      }
      return getListItem(listName, listItemName)
    })
    .then(function (listItem) {
      return makeRequestFn(routes.deleteListItem(listName, listItemName))
    })
    .catch(console.error)
  }

  function getList (listName, status = 'active') {
    validate.listName(listName)
    validate.status(status)

    return getListMetadata()
    .then(function (lists) {
      const list = utils.findSpecificListName(lists, listName, status)

      if (!list) {
        throw Error('List not found!')
      }
      return makeRequestFn(routes.getList(list.listId, status))
    })
    .then(utils.stripPropertyFromResponse())
    .catch(console.error)
  }

  function getListItem (listName, listItemName, status = 'active') {
    validate.listItemName(listItemName)

    return getList(listName, status)
    .then(function (list) {
      const listItem = utils.findSpecificListItem(list.items, listItemName)
      return makeRequestFn(routes.getListItem(list.listId, listItem.id))
    })
    .then(utils.stripPropertyFromResponse())
    .catch(console.error)
  }

  function getListMetadata () {
    return makeRequestFn(routes.getListMetadata())
    .then(utils.stripPropertyFromResponse('body.lists'))
    .catch(console.error)
  }

  function updateCustomList (listName, body) {
    validate.listName(listName)

    return getListMetadata()
    .then(function (lists) {
      const list = utils.findSpecificListName(lists, listName)
      const reqBody = _.assign(_.pick(list, ['name', 'state', 'version']), body)

      if (!list) {
        throw Error('List not found')
      }

      return makeRequestFn(routes.updateCustomList(list.listId), reqBody)
    })
    .catch(console.error)
  }

  function updateListItem (listName, listItemName, body) {
    validate.listName(listName)
    validate.listItemName(listItemName)

    return getListMetadata()
    .then(function (lists) {
      const list = utils.findSpecificListName(lists, listName)
      return makeRequestFn(routes.getList(list.listId, list.state))
    })
    .then(function (list) {
      const listItem = utils.findSpecificListItem(list.items, listItemName)
      const reqBody = _.assign(_.pick(listItem, ['version', 'value', 'status']), body)

      validate.updateListItem(body)
      return makeRequestFn(routes.updateListItem(list.listId, listItem.id), reqBody)
    })
    .catch(console.error)
  }

  return {
    createCustomList,
    createNewListItem,
    deleteCustomList,
    deleteListItem,
    getList,
    getListItem,
    getListMetadata,
    updateCustomList,
    updateListItem
  }
}

module.exports = {
  getPermissionsCard,
  init,
  routes
}
