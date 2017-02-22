define(function() {
    function ModuleStore() {}
    ModuleStore.install = function(Vue) {
        Vue.prototype.$$store = function(moduleName) {
            return this.$store.state[moduleName];
        }
    }
    return ModuleStore;
})