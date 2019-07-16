import * as Actions from '../actions';

const initialState = {
    data: []
};

const categoriesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MENU_CATEGORIES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default categoriesReducer;
