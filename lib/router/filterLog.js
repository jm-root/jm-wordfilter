const msm = require('jm-ms-mongoose')
const MS = require('jm-ms-core')
const ms = new MS()

module.exports = function (service, opts) {
  const model = service.filterLog
  const router = ms.router()
  router
    .use(msm(model))

  // .on('before_list', opts => {
  //   const {search} = opts.data
  //   if (search) {
  //     opts.conditions = {
  //       '$or': [{'words': decodeURIComponent(search)}, {'tags': decodeURIComponent(search)}]
  //     }
  //   }
  //   opts.options = {sort: {crtime: -1}}
  //
  // })

  return router
}