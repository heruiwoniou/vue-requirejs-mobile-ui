define(['__component__', './../Cell/index', 'clickoutside', 'text!./tpl.html'], function(component, csCell, Clickoutside, template) {
    var scroll;
    return component('cs-field', {
        template: template,
        data: function() {
            return {
                active: false,
                currentValue: this.value
            };
        },

        directives: {
            Clickoutside: Clickoutside
        },

        props: {
            type: {
                type: String,
                default: 'text'
            },
            rows: String,
            label: String,
            placeholder: String,
            readonly: Boolean,
            disabled: Boolean,
            disableClear: Boolean,
            icon: String,
            state: {
                type: String,
                default: 'default'
            },
            value: {},
            attr: Object
        },

        components: { csCell: csCell },
        computed: {
            stateIcon: function() {
                switch (this.state) {
                    case 'success':
                        return 'check-circle';
                    case 'error':
                        return 'times-circle';
                    case 'warning':
                        return 'exclamation-circle'
                    default:
                        return 'default';
                }
            }
        },
        methods: {
            doCloseActive: function() {
                this.active = false;
            },

            handleInput: function(evt) {
                this.currentValue = evt.target.value;
            },

            handleClear: function() {
                if (this.disabled || this.readonly) return;
                this.currentValue = '';
            }
        },

        watch: {
            value: function(val) {
                this.currentValue = val;
            },

            currentValue: function(val) {
                this.$emit('input', val);
            },

            attr: {
                immediate: true,
                handler: function(attrs) {
                    this.$nextTick(function() {
                        const target = [this.$refs.input, this.$refs.textarea];
                        target.forEach(function(el) {
                            if (!el || !attrs) return;
                            Object.keys(attrs).map(function(name) { return el.setAttribute(name, attrs[name]) });
                        });
                    }.bind(this));
                }
            }
        }
    })
})