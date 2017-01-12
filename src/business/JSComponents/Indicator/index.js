define(function() {
    return function module(moduleName) {
        return {
            methods: {
                Indicator1: function() {
                    this.$indicator.open();
                    setTimeout(function() { this.$indicator.close(); }.bind(this), 1000);
                },
                Indicator2: function() {
                    this.$indicator.open({
                        text: '加载中...',
                        spinnerType: 'fading-circle'
                    });
                    setTimeout(function() { this.$indicator.close(); }.bind(this), 1000);
                },
                Indicator3: function() {
                    this.$indicator.open({
                        text: '加载中...'
                    });
                    setTimeout(function() { this.$indicator.close(); }.bind(this), 1000);
                },
            }

        }
    }
})