import {combineReducers} from 'redux';
import searchText from './shared.reducer';

const sharedReducer = combineReducers({
    searchText
});

export default sharedReducer;
