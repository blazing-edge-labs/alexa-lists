const emptyList = {
  items: [],
  links: null,
  listId: '479e479e-479e-479e-479e-479e479e4702',
  name: 'new list',
  state: 'active',
  version: 1
}

const list = {
  items: [{
    createdTime: 'Thu Feb 08 09:54:46 UTC 2018',
    href: '/v2/householdlists/479e479e-479e-479e-479e-479e479e479e/items/479e479e-479e-479e-479e-479e479e479e',
    id: '479e479e-479e-479e-479e-479e479e4790',
    status: 'active',
    updatedTime: 'Thu Feb 08 09:54:46 UTC 2018',
    value: 'pears',
    version: 1
  }, {
    createdTime: 'Thu Feb 08 09:54:46 UTC 2018',
    href: '/v2/householdlists/479e479e-479e-479e-479e-479e479e479e/items/479e479e-479e-479e-479e-479e479e479e',
    id: '479e479e-479e-479e-479e-479e479e4791',
    status: 'active',
    updatedTime: 'Thu Feb 08 09:54:46 UTC 2018',
    value: 'melons',
    version: 1
  }],
  links: null,
  listId: '479e479e-479e-479e-479e-479e479e4701',
  name: 'blazing list',
  state: 'active',
  version: 1
}

const listItem = {
  createdTime: 'Thu Feb 08 09:54:46 UTC 2018',
  href: '/v2/householdlists/479e479e-479e-479e-479e-479e479e479e/items/479e479e-479e-479e-479e-479e479e479e',
  id: '479e479e-479e-479e-479e-479e479e4791',
  status: 'active',
  updatedTime: 'Thu Feb 08 09:54:46 UTC 2018',
  value: 'melons',
  version: 1
}

const listMetadata = [{
  listId: '479e479e479e479e479e479e479e4701479e479e479e479e479e479e479e471=',
  name: 'Alexa shopping list',
  state: 'active',
  statusMap: [{}, {}],
  version: 1
}, {
  listId: '479e479e479e479e479e479e479e4701479e479e479e479e479e479e479e470=',
  name: 'Alexa to-do list',
  state: 'active',
  statusMap: [{}, {}],
  version: 1
}, {
  listId: '479e479e-479e-479e-479e-479e479e4701',
  name: 'blazing list',
  state: 'active',
  statusMap: [{}, {}],
  version: 1
}]

module.exports = {
  emptyList,
  list,
  listItem,
  listMetadata
}
