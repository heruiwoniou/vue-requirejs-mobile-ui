define(['vue'], function(Vue) {
    return function module(moduleName) {
        return {
            methods: {
                message: function() {
                    Vue.$messagebox.confirm('确定执行此操作?').then(function(action) {
                        Vue.$messagebox.prompt('请输入法名称', '').then(function(action) {
                            Vue.$messagebox('系统消息', action.value || "你未输入值");
                        })
                    });
                }
            }
        }
    }
})