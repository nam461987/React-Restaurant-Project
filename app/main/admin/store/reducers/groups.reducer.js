import * as Actions from '../actions';

const initialState = {
    data: []
};

const groupsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_GROUPS:
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

export default groupsReducer;
