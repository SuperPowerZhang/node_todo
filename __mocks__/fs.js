const fs = jest.createMockFromModule('fs')
const _fs = jest.requireActual('fs')
let readMocks = {}
let writeMocks = {}

Object.assign(fs, _fs)

fs.setReadMock = (path, error, data) => {
    readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    //if path is mocked,return a false result 
    if (path in readMocks) {
        callback(...readMocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }
}

fs.setWriteMock = (path, fn) => {
    writeMocks[path] = fn
}
fs.writeFile = (path, data, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    if (path in writeMocks) {
        console.log('假的write')
        writeMocks[path](path, data, options, callback)
    } else {
        _fs.writeFile(path, data, options, callback)
    }
}
fs.clearMocks = () => {
    readMocks = {}
    writeMocks = {}
}
module.exports = fs