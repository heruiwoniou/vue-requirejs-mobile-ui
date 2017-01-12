define(function() {
    return function module(moduleName) {
        return {
            data: function() {
                return {
                    sheet1: {
                        sheetVisible: false
                    },
                    sheet2: {
                        sheetVisible: false
                    }
                }
            },
            methods: {
                itemclick: function() { console.log('itemclick'); },
                action1: function() { this.sheet1.sheetVisible = true; },
                action2: function() { this.sheet2.sheetVisible = true; }
            }

        }
    }
})