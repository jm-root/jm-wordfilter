const msm = require('jm-ms-mongoose')
const MS = require('jm-ms-core')
const ms = new MS()

module.exports = function (service, opts = {}) {
  const model = service.word

  const list = opts.list || {
    conditions: {},
    options: {
      sort: [{'crtime': -1}]
    }
  }

  const router = ms.router()
  router
    .use(msm(model, {list}))

  model
    .on('before_create', async opts => {

    })
    .on('before_list', opts => {
      const {search} = opts.data
      const pattern = '.*?' + decodeURIComponent(search) + '.*?'
      opts.conditions = {
        word: {$regex: pattern, $options: 'i'}
      }
    })

  //
  // word.routes.before_create = function (opts, cb) {
  //   var data = opts.data
  //   var arr = data.word.split(/[,，、；;\r?\n]/ig)
  //   async.each(arr, function (item, cb) {
  //     word.create({word: item, crtime: data.crtime}, function (err, doc) {
  //       if (err) {
  //         console.log(err)
  //         return cb(err)
  //       }
  //       cb()
  //     })
  //   }, function (err, doc) {
  //     if (err) {
  //       return cb(err, {err: -1, msg: '失败'})
  //     }
  //     service.mq.publish('wordfilter.word.refash', {})
  //     cb(null, {ret: '创建成功'})
  //   })
  // }

  // word.routes.after_update = function (opts, cb, next) {
  //   service.mq.publish('wordfilter.word.refash', {})
  //   next()
  // }
  // word.routes.after_remove = function (opts, cb, next) {
  //   service.mq.publish('wordfilter.word.refash', {})
  //   next()
  // }
  return router
}
