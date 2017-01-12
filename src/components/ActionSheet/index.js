define(['__component__', 'vue-popup', 'text!./tpl.html'], function(component, Popup, template) {
    return component('cs-actionsheet', {
        template: template,
        mixins: [Popup],

        props: {
            modal: {
                default: true
            },

            modalFade: {
                default: true
            },

            lockScroll: {
                default: false
            },

            closeOnClickModal: {
                default: true
            },

            cancelText: {
                type: String,
                default: '取消'
            },

            actions: {
                type: Array,
                default: function() { return []; }
            }
        },

        data: function() {
            return {
                currentValue: false
            };
        },

        watch: {
            currentValue: function(val) {
                this.$emit('input', val);
            },

            value: function(val) {
                this.currentValue = val;
            }
        },

        methods: {
            itemClick: function(item) {
                if (item.method && typeof item.method === 'function') {
                    item.method.apply(this);
                }
                this.currentValue = false;
            }
        },

        mounted: function() {
            if (this.value) {
                this.rendered = true;
                this.currentValue = true;
                this.open();
            }
        }
    })
})