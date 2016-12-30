define(['vuex'], function(vuex) {
    return function(name, cpt, require) {
        var module = name.replace('cs-', '');
        var mixin = {
            computed: {
                transitionName: function() {
                    var transition = this.$store.state[module].transitionName;
                    console.log(module);
                    return transition;
                }
            },
            methods: vuex.mapActions([
                'transition'
            ]),
            destroyed: function() {
                console.log('destroy', module);
            }
        }
        return Object.assign(cpt, {
            name: name,
            mixins: [mixin],
            template: require('text!./tpl.html')
        });
    }
})