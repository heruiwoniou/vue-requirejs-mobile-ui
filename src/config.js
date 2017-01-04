var __config__ = {
    modules: [
        { path: '/', name: 'login' },
        { path: '/main', name: 'main' },
        { path: '/main/admin', name: 'admin' },
        { path: '/main/teacher', name: 'teacher' },
        { path: '/main/parent', name: 'parent' }
    ],
    map: function(dispose) {
        return this.modules.map(dispose);

    },
    each: function(dispose) {
        return this.modules.forEach(dispose);

    }
}