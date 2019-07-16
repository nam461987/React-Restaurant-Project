import * as Actions from '../actions';

const initialState = {
    data: []
};

const sizesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MENU_SIZES:
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

export default sizesReducer;
