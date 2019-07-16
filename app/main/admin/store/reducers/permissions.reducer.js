import * as Actions from '../actions';

const initialState = {
    data: []
};

const permissionsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PERMISSIONS:
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

export default permissionsReducer;
