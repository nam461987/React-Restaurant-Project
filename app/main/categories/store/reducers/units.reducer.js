import * as Actions from '../actions';

const initialState = {
    data: []
};

const unitsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MENU_UNITS:
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

export default unitsReducer;
