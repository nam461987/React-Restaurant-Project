import * as Actions from '../actions';

const initialState = {
    order: null
};

const ordersReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.ADD_ORDER:
            {
                return {
                    ...state,
                    order: action.payload
                };
            }
        case Actions.GET_PLACED_ORDER_DEFAULT_FORM:
            {
                return {
                    ...state,
                    order: action.payload
                };
            }
        case Actions.ADD_PRE_ORDER_TO_REDUCER:
            {
                return {
                    ...state,
                    order: action.payload
                };
            }
        case Actions.SET_DEFAULT_ORDER_VALUE:
            {
                return {
                    ...state,
                    order: null
                };
            }
        default:
            {
                return state;
            }
    }
};

export default ordersReducer;
