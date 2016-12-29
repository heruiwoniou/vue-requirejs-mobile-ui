define(['require', 'component'].dispose('tpl'), function(require, component) {
    var scroll;
    return component('cs-field', {
        props: {
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