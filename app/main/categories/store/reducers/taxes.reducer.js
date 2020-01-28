import * as Actions from '../actions';

const initialState = {
    data: []
};

const taxesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_TAXES:
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

export default taxesReducer;
