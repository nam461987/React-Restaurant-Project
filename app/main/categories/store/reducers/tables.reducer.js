import * as Actions from '../actions';

const initialState = {
    data: []
};

const tablesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_TABLES:
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

export default tablesReducer;
