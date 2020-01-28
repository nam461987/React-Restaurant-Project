import * as Actions from '../actions';

const initialState = {
    data: []
};

const definesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MENU_DEFINES:
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

export default definesReducer;
