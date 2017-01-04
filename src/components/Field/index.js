define(['__component__', 'text!./tpl.html'], function(component, template) {
    var scroll;
    return component('cs-field', {
        template: template,
        props: {
            leftIcon: String,
            rightIcon: String,
            type: {
                type: String,
                default: 'text',
                validator: function(value) {
                    return [
                        'text',
                        'password',
                        'textarea'
                    ].indexOf(value) > -1;
                }
            },
            rows: String,
            placeholder: String,
            readonly: Boolean,
            disabled: Boolean
        }
    })
})