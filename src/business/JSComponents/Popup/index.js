define(function() {
    return function module(moduleName) {
        return {
            data: function() {
                return {
                    popupVisible: false
                }
            },
            methods: {
                Popup: function() {
                    this.popupVisible = true;
                }
            }
        }
    }
})