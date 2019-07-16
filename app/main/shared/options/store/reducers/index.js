import {combineReducers} from 'redux';
import options from './option.reducer';

const optionReducer = combineReducers({
    options
});

export default optionReducer;
