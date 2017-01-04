define(['../mutation-types'], function(types) {
    function ModuleStore(module) {
        module = module.replace(/\//g, '_').toLocaleUpperCase() + '_';
        this.state = {
            transitionName: 'fade'
        };
        //mutations
        this.mutations = {};

        this.mutations[module + types.SLIDE_LEFT] = function(state) {
            state.transitionName = "slide-left";
        };
        this.mutations[module + types.SLIDE_RIGHT] = function(state) {
            state.transitionName = "slide-right";
        };
        this.mutations[module + types.SLIDE_BOTTOM] = function(state) {
            state.transitionName = "slide-bottom";
        };
        this.mutations[module + types.SLIDE_TOP] = function(state) {
            state.transitionName = "slide-top";
        };
        this.mutations[module + types.FADE] = function(state) {
            state.transitionName = "fade";
        };
        //actions
        this.actions = {};
        this.actions[module + 'OUT_LEFT'] = function(content) {
            content.commit(module + types.SLIDE_LEFT);
        };
        this.actions[module + 'IN_LEFT'] = function(content) {
            content.commit(module + types.SLIDE_LEFT);
        };
        this.actions[module + 'OUT_RIGHT'] = function(content) {
            content.commit(module + types.SLIDE_RIGHT);
        };
        this.actions[module + 'IN_RIGHT'] = function(content) {
            content.commit(module + types.SLIDE_RIGHT);
        };
        this.actions[module + 'OUT_BOTTOM'] = function(content) {
            content.commit(module + types.SLIDE_BOTTOM);
        };
        this.actions[module + 'IN_BOTTOM'] = function(content) {
            content.commit(module + types.SLIDE_BOTTOM);
        };
        this.actions[module + 'OUT_TOP'] = function(content) {
            content.commit(module + types.SLIDE_TOP);
        };
        this.actions[module + 'IN_TOP'] = function(content) {
            content.commit(module + types.SLIDE_TOP);
        };
        this.actions[module + 'TO_FROM_FADE'] = function(content) {
            content.commit(module + types.FADE);
        };
    };
    return function(modue) { return new ModuleStore(modue); }
})