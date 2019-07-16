import * as Actions from '../actions';

const initialState = {
    data: []
};

const ingredientsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_INGREDIENTS:
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

export default ingredientsReducer;
