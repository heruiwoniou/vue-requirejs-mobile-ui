define(['calc'], function(calc) {
    return {
        computed: {
            spinnerColor: function() {
                return this.color || this.$parent.color || '#ccc';
            },

            spinnerSize: function() {
                return calc.toRem((this.size || this.$parent.size || 60));
            }
        },

        props: {
            size: Number,
            color: String
        }
    }
})