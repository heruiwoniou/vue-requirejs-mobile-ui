var auth = 'logined'
module.exports = {
    verify(query) {
        var pass = query.username == 'admin' && query.password == 'ab123';
        return this.render.json({
            state: pass,
            auth: pass ? auth : ''
        })
    },
    auth(query) {
        return this.render.json(query.auth == auth)
    }
}