define(['__component__', 'text!./tpl.html'], function(component, template) {
    return component('cs-checklist', {
        template: template,
        props: {
            max: Number,
            title: String,
            align: String,
            options: {
                type: Array,
                required: true
            },
            value: Array
        },

        data: function() {
            return {
                currentValue: this.value
            };
        },

        computed: {
            limit: function() {
                return this.max < this.currentValue.length;
            }
        },

        watch: {
            value: function(val) {
                this.currentValue = val;
            },

            currentValue: function(val) {
                if (this.limit) val.pop();
                this.$emit('input', val);
            }
        }
    })
})