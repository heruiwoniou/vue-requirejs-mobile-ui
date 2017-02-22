module.exports = {
    verify(query) {
        var pass = query.username == 'admin' && query.password == 'ab123';
        return this.render.json({
            state: pass,
            auth: pass ? 'aa' : ''
        })
    },
    auth(query) {
        return this.render.json(query.auth == 'ba')
    }
}