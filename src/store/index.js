import { createStore } from 'redux';
// importando reducers
import redurcer from './reducers';
// importando sagas


const store = createStore(redurcer);


export default store;
