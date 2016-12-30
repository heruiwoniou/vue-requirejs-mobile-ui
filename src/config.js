var __config__ = {
    modules: [
        { path: '/', name: 'login' },
        { path: '/main', name: 'main' },
        { path: '/main/admin', name: 'admin' },
        { path: '/main/teacher', name: 'teacher' },
        { path: '/main/parent', name: 'parent' }
    ],
    __get__modules__: function() {
        var regex = /^[\w]/;
        return this.modules.map(function(o) { return 'business/' + o.name.replace(/^[\w]/, function(m) { return m.toLocaleUpperCase() }); })
    },
    __set__modules__: function(arr) {
        return this.modules.map(function(o, i) {
            var clone = Object.assign({}, o);
            delete clone.name;
            clone.component = arr[i];
            return clone;
        })
    }
}