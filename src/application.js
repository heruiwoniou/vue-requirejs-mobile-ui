define(['vue', 'vue-router', 'business/Router'].dispose('cpt'), function(Vue, VueRouter, Router) {
    return {
        run: function() {
            Vue.config.silent = false;
            Vue.config.devtools = true;
            new Vue({
                el: 'body > div',
                template: Router.tpl,
                router: Router.router
            });
        }
    }
})