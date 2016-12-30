define(['../mutation-types'], function(types) {
    function ModuleStore(module) {
        module = module.replace(/\//g, '_').toLocaleUpperCase() + '_';
        this.state = {
            transitionName: 'fade'
        };
        //mutations
        this.mutations = {};

        this.mutations[module + types.TO_FROM_LEFT] = function(state) {
            state.transitionName = "slide-left";
        }
        this.mutations[module + types.TO_FROM_RIGHT] = function(state) {
            state.transitionName = "slide-right";
        }
        this.mutations[module + types.TO_FROM_BOTTOM] = function(state) {
            state.transitionName = "slide-bottom";
        }
        this.mutations[module + types.TO_FROM_FADE] = function(state) {
            state.transitionName = "fade";
        }

        //actions
        this.actions = {};
        this.actions[module + 'TO_LEFT'] = function(content) {
            content.commit(module + types.TO_FROM_RIGHT);
        };
        this.actions[module + 'TO_RIGHT'] = function(content) {
            content.commit(module + types.TO_FROM_LEFT);
        };
        this.actions[module + 'FROM_LEFT'] = function(content) {
            content.commit(module + types.TO_FROM_LEFT);
        };
        this.actions[module + 'FROM_RIGHT'] = function(content) {
            content.commit(module + types.TO_FROM_RIGHT);
        };
        this.actions[module + 'TO_FROM_BOTTOM'] = function(content) {
            content.commit(module + types.TO_FROM_BOTTOM);
        }
        this.actions[module + 'TO_FROM_FADE'] = function(content) {
            content.commit(module + types.TO_FROM_FADE);
        }
    }
    return function(modue) { return new ModuleStore(modue); }
})