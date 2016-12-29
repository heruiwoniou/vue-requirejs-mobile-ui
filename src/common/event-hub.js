var eventHub;
define(['vue'], function(Vue) {
    return eventHub ? eventHub : (eventHub = new Vue());
})