const {Schema} = require('mongoose')

//敏感词表
const schemaDefine = {
  word: {type: String, unique: true, index: true},   //敏感词
  creator: {type: Schema.Types.ObjectId}, //对应sso user id
  crtime: {type: Date, default: Date.now},
  status: {type: Number, default: 1}     //0无效 1有效
}

module.exports = function (schema) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}