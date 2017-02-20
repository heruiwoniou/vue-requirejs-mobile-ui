define(['__component__', 'vue-popup', 'text!./tpl.html'], function(component, Popup, template) {
    return component('cs-popup', {
        template: template,
        mixins: [Popup],

        props: {
            modal: {
                default: true
            },

            modalFade: {
                default: false
            },

            lockScroll: {
                default: false
            },

            closeOnClickModal: {
                default: true
            },

            popupTransition: {
                type: String,
                default: 'popup-slide'
            },

            position: {
                type: String,
                default: ''
            }
        },

        data: function() {
            return {
                currentValue: false,
                currentTransition: this.popupTransition
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

        beforeMount: function() {
            if (this.popupTransition !== 'popup-fade') {
                this.currentTransition = "popup-slide-" + this.position;
            }
        },

        mounted: function() {
            if (this.value) {
                this.rendered = true;
                this.currentValue = true;
                this.open();
            }
        }
    });
})