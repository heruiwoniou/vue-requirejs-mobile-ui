define(['calc', '__component__', 'text!./tpl.html'], function(calc, component, template) {
    return component('cs-footer', {
        template: template,
        props: {
            transparent: Boolean,
            height: {
                type: Number,
                default: null
            }
        },
        computed: {
            dynamicStyle: function() {
                var styleObject = {};
                this.height == null ? null : styleObject.height = calc.toRem(this.height);
                this.transparent == false ? null : styleObject.backgroundColor = "transparent";
                return styleObject;
            }
        }
    })
})