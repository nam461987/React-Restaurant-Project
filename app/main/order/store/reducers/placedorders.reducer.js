import * as Actions from '../actions';

const initialState = {
    data: []
};

const placedOrdersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PLACED_ORDERS:
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

export default placedOrdersReducer;
