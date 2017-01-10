define(['__component__', 'text!./tpl.html'], function(component, template) {
    return component('cs-cell', {
        template: template,
        name: 'cs-cell',

        props: {
            to: [String, Object],
            icon: String,
            title: String,
            label: String,
            isLink: Boolean,
            value: {}
        },

        computed: {
            href: function() {
                if (this.to && !this.added && this.$router) {
                    const resolved = this.$router.match(this.to);
                    if (!resolved.matched.length) return this.to;

                    this.$nextTick(function() {
                        this.added = true;
                        this.$el.addEventListener('click', this.handleClick);
                    }.bind(this));
                    return resolved.path;
                }
                return this.to;
            }
        },

        methods: {
            handleClick: function($event) {
                $event.preventDefault();
                this.$router.push(this.href);
            }
        }
    })
})