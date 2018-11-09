const wrapper = require('jm-ms-wrapper')
const error = require('jm-err')
const MS = require('jm-ms-core')
const help = require('./help')
const word = require('./word')
const filterLog = require('./filterLog')

const ms = new MS()
const Err = error.Err

module.exports = function (opts = {}) {
  let service = this

  let filterReady = async opts => {
    if (!service.ready) {
      throw error.err(Err.FA_NOTREADY)
    }
  }

  const router = ms.router()
  wrapper(service.t)(router)

  router
    .use(help(service))
    .use(filterReady)

  service.onReady()
    .then(() => {
      router
        .use('/words', word(service))
        .use('/filterLogs', filterLog(service))
    })

  return router
}
