const jm = require('jm-dao')
const event = require('jm-event')
const _schema = require('../schema/word')

module.exports = function (service, opts = {}) {
  let schema = opts.schema || _schema()
  const {db, model_name = 'word', table_name, table_name_prefix, schemaExt} = opts

  let model = jm.dao({
    db,
    modelName: model_name,
    tableName: table_name,
    prefix: table_name_prefix,
    schema,
    schemaExt
  })
  event.enableEvent(model)

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
