define(['__component__', 'text!./tpl.html'], function(component, template) {
    return component('cs-button', {
        template: template,
        methods: {
            clickHandle: function(evt) {
                this.disabled ? undefined : this.$emit('click', evt);
            }
        },
        props: {
            icon: String,
            disabled: Boolean,
            type: {
                type: String,
                default: 'default',
                validator: function(value) {
                    return [
                        'default',
                        'danger',
                        'primary'
                    ].indexOf(value) > -1;
                }
            },
            size: {
                type: String,
                default: 'normal',
                validator: function(value) {
                    return [
                        'small',
                        'normal',
                        'large'
                    ].indexOf(value) > -1;
                }
            }
        }
    })
})