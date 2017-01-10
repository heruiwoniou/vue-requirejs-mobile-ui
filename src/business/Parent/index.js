define(['vue'], function(Vue) {
    return function module(moduleName) {
        return {
            methods: {
                message1: function() { Vue.$messagebox('提示', '操作成功'); },
                message2: function() { Vue.$messagebox.alert('操作成功'); },
                message3: function() { Vue.$messagebox.confirm('确定执行此操作?'); },
                message4: function() { Vue.$messagebox.prompt('请输入姓名'); },
                indicator1: function() {
                    Vue.$indicator.open()
                    setTimeout(function() { Vue.$indicator.close(); }, 1000);
                },
                indicator2: function() {
                    Vue.$indicator.open("加载中");
                    setTimeout(function() { Vue.$indicator.close(); }, 1000);
                },
                indicator3: function() {
                    Vue.$indicator.open({ spinnerType: 'fading-circle' })
                    setTimeout(function() { Vue.$indicator.close(); }, 1000);
                }
            }

        }
    }
})