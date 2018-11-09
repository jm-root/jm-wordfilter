const {Schema} = require('mongoose')

//敏感词过滤日志表
const schemaDefine = {
  userId: {type: Schema.Types.ObjectId}, //对应sso user id, 可以为null
  ip: {type: String},     //ip
  content: {type: String},   //拦截内容
  words: [{type: String}],   //匹配的敏感词
  tags: [String],            //标签，　比如sso, bank
  crtime: {type: Date, default: Date.now}    //拦截时间
}

module.exports = function (schema) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}