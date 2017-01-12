define(['vuex'], function(vuex) {
    return function(module, cpt, template) {
        var mixin = {
            computed: {
                transitionName: function() {
                    var transition = this.$store.state[module].transitionName;
                    return transition;
                },
                topLayer: function() {
                    return this.$store.state[module].topLayer
                }
            }
        }
        return Object.assign(cpt, {
            name: 'bus-' + module,
            template: template,
            mixins: [mixin]
        });
    }
})