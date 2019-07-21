import {combineReducers} from 'redux';
import orders from './orders.reducer';

const reducer = combineReducers({
    orders
});

export default reducer;
