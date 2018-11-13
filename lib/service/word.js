const mongoose = require('mongoose')
const _schema = require('../schema/word')

module.exports = function (service, opts = {}) {
  const {db = mongoose} = service
  const {modelName = 'word', tableNamePrefix = '', schema = _schema()} = opts
  const tableName = `${tableNamePrefix}${modelName}`
  const model = db.model(modelName, schema, tableName)

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
