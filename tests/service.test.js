const $ = require('./service')

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $
})

describe('service', () => {

  test('create word', async () => {
    let doc = await service.word.create({word: '淘宝'})
    expect(doc.id).toBeTruthy()
  })

})
