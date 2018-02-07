const _ = require('lodash')

function status (status) {
  if (!_.includes(['active', 'completed'], _.toLower(status))) {
    throw Error('List status can only be "active" or "completed"!')
  }
}

function listName (listName) {
  if (!_.trim(listName)) {
    throw Error('List name cannot be empty!')
  }
}

function listItemName (listItemName) {
  if (!_.trim(listItemName)) {
    throw Error('List item name cannot be empty')
  }
}

function updateListItem (body) {
  if (!_(['name', 'state', 'version']).difference(_.keys(body)).isEmpty()) {
    throw Error('Body has invalid properties. Only "name", "state" and "version" are allowed!')
  }

  validate.listName(body.listName)
  validate.status(body.state)

  if (_.size(_.trim(body.name)) > 256) {
    throw Error('List name cannot be greater than 256 characters!')
  }

  if (!_.isNumber(body.version)) {
    throw Error('Version must be a number!')
  }
}

module.exports = {
  status,
  listName,
  listItemName,
  updateListItem
}
