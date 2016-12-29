define(['require', 'component', 'calc'].dispose('tpl'), function(require, component, calc) {
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