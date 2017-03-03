define(['__component__', 'text!./tpl.html', 'components/Cell/index'], function(component, template, csCell) {
    return component('cs-search', {
        template: template,
        data: function() {
            return {
                visible: false,
                currentValue: this.value
            };
        },

        components: { csCell: csCell },

        watch: {
            currentValue: function(val) {
                this.$emit('input', val);
            },

            value: function(val) {
                this.currentValue = val;
            }
        },

        props: {
            value: String,
            autofocus: Boolean,
            show: Boolean,
            cancelText: {
                default: '取消'
            },
            placeholder: {
                default: '搜索'
            },
            result: Array
        },

        mounted: function() {
            this.autofocus && this.$refs.input.focus();
        }
    })
})