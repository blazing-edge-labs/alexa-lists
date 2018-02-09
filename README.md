# Alexa lists
Working with lists requires proper permissions for your skill, read the permissions part of the [amazon documentation](https://developer.amazon.com/docs/custom-skills/access-the-alexa-shopping-and-to-do-lists.html#permissions-setup) before using this module.

Before making the requests you need to provide the access token. That is why the `init` function needs to be called first. All examples use the [alexa-app](https://github.com/alexa-js/alexa-app) module.

```
npm install --save @blazingedge/alexa-lists
```


### Permissions card
If you don't have the permissions to work with lists, then you should send the permissions `card` to the user.
#### Example
```javascript
function sendPermissionsCard (req, res) {
  return res.card(alexaLists.getPermissionsCard()).send()
}
```

----------
### Create custom list
Creates a new with the provided name and a state set to `active`.
```javascript
alexaLists.init(token).createCustomList(listName)
```
#### Example
```javascript
async function createCustomList (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const createdList = await listHandler.createCustomList('blazing new list')
  ...
}
```
----------
### Create custom list item
Creates a new item for a specified list with the provided item status can be `active` or `completed`. The `active` status is set by default

```javascript
alexaLists.init(token).createNewListItem(listName, listItemName, listItemStatus)
```
#### Example
```javascript
async function createNewListItem (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const createdListItem = await listHandler.createNewListItem('blazing list', 'buy apples', 'completed')
  ...
}
```
----------
### Delete custom list
Delete a custom list by name.
```javascript
alexaLists.init(token).deleteCustomList(listName)
```
#### Example
```javascript
async function deleteCustomList (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const deletedList = await listHandler.deleteCustomList('blazing list')
  ...
}
```
----------
### Delete custom list item
Delete a list item from a specified list.
```javascript
alexaLists.init(token).deleteListItem(listName, listItemName)
```
#### Example
```javascript
async function deleteListItem (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const deletedListItem = await listHandler.deleteListItem('blazing list', 'buy apples')
  ...
}
```
----------
### Get list
Get specific list by name and/or status.
```javascript
alexaLists.init(token).getList(listName, listState)
```
#### Example
```javascript
async function getList (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const list = await listHandler.getList('blazing list', 'active')
  ...
}
```
----------
### Get list item
Get a specific list item from a list.
```javascript
alexaLists.init(token).getListItem(listName, listItemName)
```
#### Example
```javascript
async function getListItem (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const listItem = await listHandler.getListItem('blazing list', 'list item')
  ...
}
```
----------
### Get lists metadata
Get all lists, without the list items.
```javascript
alexaLists.init(token).getListMetadata(listName, listItemName)
```
#### Example
```javascript
async function getListMetadata (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const lists = await listHandler.getListMetadata()
  ...
}
```
----------
### Update custom list
```javascript
alexaLists.init(token).updateCustomList(listName, {
  name: 'new list name',
  state: 'completed'
})
```
#### Example
```javascript
async function updateCustomList (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const updatedCustomList = await listHandler.updateCustomList('blazing list', {
    name: 'new list name',
    state: 'completed'
  })
  ...
}
```
----------
### Update list item
```javascript
alexaLists.init(token).updateListItem(listName, listItemName, {
  value: 'new list item name',
  status: 'completed'
})
```
#### Example
```javascript
async function updateListItem (req, res) {
  const listHandler = alexaLists.init(_.get(req, 'context.System.apiAccessToken'))
  const updatedListItem = await listHandler.updateListItem('blazing list', 'some item', {
    value: 'some updated item name',
    status: 'completed'
  })
  ...
}
```
