import * as Actions from '../actions';

const initialState = {
    data: []
};

const accountsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ACCOUNTS:
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

export default accountsReducer;
