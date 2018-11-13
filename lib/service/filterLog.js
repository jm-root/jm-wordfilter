const mongoose = require('mongoose')
const _schema = require('../schema/filterLog')

module.exports = function (service, opts = {}) {
  const {db = mongoose} = service
  const {modelName = 'filterLog', tableNamePrefix = '', schema = _schema()} = opts
  if (tableNamePrefix) {
    const tableName = `${tableNamePrefix}${modelName}`
    return db.model(modelName, schema, tableName)
  } else {
    return db.model(modelName, schema)
  }
}
