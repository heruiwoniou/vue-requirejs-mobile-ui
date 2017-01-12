define(function() {
    return function module(moduleName) {
        return {
            methods: {
                alert: function() {
                    //this.$messagebox('提示', '操作成功')
                    this.$messagebox.alert('操作成功');
                },
                confirm: function() {
                    this.$messagebox.confirm('确定执行此操作?');
                },
                prompt: function() {
                    this.$messagebox.prompt('请输入姓名');
                },
            }

        }
    }
})