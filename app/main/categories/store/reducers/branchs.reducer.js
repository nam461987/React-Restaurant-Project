import * as Actions from '../actions';

const initialState = {
    data: []
};

const branchsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_BRANCHS:
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

export default branchsReducer;
