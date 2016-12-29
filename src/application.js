define(['vue', 'vue-router', 'business/Router', 'event-hub'].dispose('cpt'), function(Vue, VueRouter, Router, EventHub) {
    return {
        run: function() {
            Vue.config.silent = false;
            Vue.config.devtools = true;
            new Vue({
                el: 'body > div',
                template: Router.tpl,
                router: Router.router,
                watch: {
                    "$route": function(to, from) {
                        EventHub.$emit('transition', to, from);
                    }
                }
            });
        }
    }
})