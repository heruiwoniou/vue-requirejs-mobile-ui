define(['require', 'calc', '__component__'].dispose('tpl'), function(require, calc, component) {
    return component('cs-footer', {
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
    }, require)
})