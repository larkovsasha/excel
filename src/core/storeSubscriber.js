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
        this.unsub = null;
        this.prevState = {};
    }

    /**
     * gives the component the changes that happened in the store
     * @param {ExcelComponent} components
     */
    subscribeComponents(components) {
        this.prevState = this.store.getState();
        this.unsub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if (!isEqual(state[key], this.prevState[key])) {
                    components.forEach(component => {
                        if (component.isWatching(key)) {
                            const changes = {[key]: state[key]};
                            component.storeChanged(changes);
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
        this.unsub.unsubscribe();
    }
}
