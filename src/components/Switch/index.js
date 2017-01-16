define(['__component__', 'text!./tpl.html'], function(component, template) {
    return component('cs-switch', {
        template: template,
        props: {
            value: Boolean
        },
        computed: {
            currentValue: {
                get: function() {
                    return this.value;
                },
                set: function(val) {
                    this.$emit('input', val);
                }
            }
        }
    })
})