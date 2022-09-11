import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../redusers';
import thunk from 'redux-thunk';


const compseEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ ||compose
const store = createStore(
    rootReducer,
    compseEnhancers(applyMiddleware(thunk))
    
    
    
);

export default store