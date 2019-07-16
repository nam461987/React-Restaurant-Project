import * as Actions from '../actions';

const initialState = {
    searchText: ''
};

const itemsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_ITEMS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.CLEAR_ITEMS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default itemsReducer;
