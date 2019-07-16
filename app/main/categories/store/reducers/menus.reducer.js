import * as Actions from '../actions';

const initialState = {
    data: []
};

const menusReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MENUS:
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

export default menusReducer;
