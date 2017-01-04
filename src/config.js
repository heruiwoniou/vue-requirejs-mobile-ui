(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.__config__ = factory());
})(this, function() {
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
        },
        dynamic: function(store) {
            (new Function(store)).apply(window);
        }
    }
    return __config__;
})