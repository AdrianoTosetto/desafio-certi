const serverTest = require('./server_test')

const request = require("supertest")


describe('GET /123', function () {
    it('respond with a json containing the written form of 123', done => {
        request(serverTest)
            .get('/123')
            .expect(200, {ok: true, extenso: 'cento e vinte e três'})
            .end(done)
    })
})

describe('GET /abc', function () {
    it('respond with a error status', done => {
        request(serverTest)
            .get('/abc')
            .expect(200, {
                ok: false,
				error: 'Invalid format',
				errorType: 1
            })
            .end(done)
    })
})