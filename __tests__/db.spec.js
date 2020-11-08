const db = require('../db')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
    afterEach(() => {
        fs.clearMocks()
    })
    it('can read', async () => {
        const data = [{ title: 'hi', done: false }]
        fs.setReadMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })
    it('can write', async () => {
        let fakeFile
        const list = [{ title: 'running', done: true }, { title: 'playing', done: true }]
        fs.setWriteMock('/yyy', (path, data, options, callback) => {
            fakeFile = data
            callback(null)
        })
        await db.write(list, './yyy')
        expect(fakeFile).toBe(JSON.stringify(list) + '\n')
    })
})