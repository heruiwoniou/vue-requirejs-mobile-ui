define(['require', '__component__'].dispose('tpl'), function(require, component) {
    var scroll;
    return component('cs-field', {
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
    }, require)
})