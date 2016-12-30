define([
    'vue',
    'vue-router',
    'store/index',
    'router/index',
    'emitter',
    'install'
].dispose('component'), function(Vue, VueRouter, store, router, Emitter) {
    return {
        run: function() {
            Vue.config.silent = false;
            Vue.config.devtools = true;
            Vue.mixin(Emitter);
            $vm = new Vue({
                el: 'body > div',
                store: store,
                template: router.tpl,
                router: router.router
            });
        }
    }
})