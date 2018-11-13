const mongoose = require('mongoose')
const _schema = require('../schema/word')

module.exports = function (service, opts = {}) {
  const {db = mongoose} = service
  const {modelName = 'word', tableNamePrefix = '', schema = _schema()} = opts

  let model = null
  if (tableNamePrefix) {
    const tableName = `${tableNamePrefix}${modelName}`
    model = db.model(modelName, schema, tableName)
  } else {
    model = db.model(modelName, schema)
  }

  // 自动初始化
  const autoInit = async function () {
    const doc = await model.findOne()
    if (doc) return

    const words = require('../../config/words.json')
    for (const word of words) {
      model.create({word})
    }
  }

  autoInit()

  return model
}
