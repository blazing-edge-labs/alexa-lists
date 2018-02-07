const _ = require('lodash')

function compareStrings (searchingStr, property) {
  return function (str) {
    const listName = _.get(str, property)
    return _(searchingStr).toLower().replace(/ /g, '-') === _(listName).toLower().replace(/ /g, '-')
  }
}

function stripPropertyFromResponse (property = 'body') {
  return function _stripPropertyFromResponse (response) {
    return _.get(response, property)
  }
}

function findSpecificListName (lists, listName, status) {
  return _.find(lists, function (list) {
    let isStatusOk = status ? status === list.state : true
    return compareStrings(listName, 'name') && isStatusOk
  })
}

function findSpecificListItem (listItems, listItemName) {
  return _.find(listItems, compareStrings(listItemName, 'value'))
}

module.exports = {
  compareStrings,
  findSpecificListItem,
  findSpecificListName,
  stripPropertyFromResponse
}
