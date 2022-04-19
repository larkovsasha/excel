/**
 * create global store
 * @param {Function} rootReducer
 * @param {Object} initialState
 * @return {Object} rootReducer
 */
export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer(initialState, {type: '__INIT__'});
    let listeners = [];
    return {
        subscribe(fn) {
            listeners.push(fn);
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== fn);
                },
            };
        },

        dispatch(action) {
            state = rootReducer(state, action);
            listeners.forEach(listeners => listeners(state));
        },

        getState() {
            return JSON.parse(JSON.stringify(state));
        },
    };
}
