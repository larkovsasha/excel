import {isEqual} from "@core/utils";


/**
 * subscribes components for changes of store
 */
export class StoreSubscriber {
    /**
     * {@link createStore}
     * @param {Object} store
     */
    constructor(store) {
        this.store = store;
        this.sub = null;
        this.prevState = {};
    }

    /**
     * gives the component the changes that happened in the store
     * @param {ExcelComponent} components
     */
    subscribeComponents(components) {
        this.prevState = this.store.getState();
        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                // if (key === 'cu')
                if (!isEqual(state[key], this.prevState[key])) {
                    components.forEach(c => {
                        if (c.isWatching(key)) {
                            const changes = {[key]: state[key]};
                            c.storeChanged(changes);
                        }
                    });
                }
            });
            this.prevState = this.store.getState();
        });
    }

    /**
     * unsubscribe components from store
     */
    unsubscribeComponents() {

    }
}
