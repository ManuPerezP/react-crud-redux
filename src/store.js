import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
    reducer, 
    compose(applyMiddleware(thunk),     //por que usaremos thunk sino no va
    typeof window === 'object' && 
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? /* para el plugin de redux en chorme, una validacion si falla la carga y para que mo falle en otros navegadores*/ 
    window.__REDUX_DEVTOOLS_EXTENSION__():f=>f
)
);

export default store;
