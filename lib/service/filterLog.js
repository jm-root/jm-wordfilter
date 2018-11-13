const mongoose = require('mongoose')
const _schema = require('../schema/filterLog')

module.exports = function (service, opts = {}) {
  const {db = mongoose} = service
  const {modelName = 'filterLog', tableNamePrefix = '', schema = _schema()} = opts
  const tableName = `${tableNamePrefix}${modelName}`
  const model = db.model(modelName, schema, tableName)

  return model
}
