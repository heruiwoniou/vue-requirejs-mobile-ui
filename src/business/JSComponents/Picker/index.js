define(function() {
    return function module(moduleName) {

        return {
            data: function() {
                return {
                    birthyear: [
                        { flex: 1, values: function() { var baseyear = 1950; var arr = []; while (baseyear <= 2017) arr.push(baseyear++ + '年'); return arr; }() },
                        { divider: true, content: '-' },
                        { flex: 1, values: function() { var month = 12; var arr = []; while (month > 0) arr.unshift((month-- + '月')); return arr; }() }
                    ],
                    yeartime: [{
                        flex: 1,
                        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                        className: 'slot1',
                        textAlign: 'right'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                        className: 'slot3',
                        textAlign: 'left'
                    }]
                }
            },
            methods: {
                onValuesChange: function(picker, values) {
                    if (values[0] > values[1]) {
                        picker.setSlotValue(1, values[0]);
                    }
                }
            }

        }
    }
})