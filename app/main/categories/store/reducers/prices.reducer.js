import * as Actions from '../actions';

const initialState = {
    data: []
};

const pricesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PRICES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_PRICES_BY_MENU:
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

export default pricesReducer;
