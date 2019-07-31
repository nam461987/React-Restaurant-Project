import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const placedOrderReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PLACED_ORDER:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_PLACED_ORDER:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_PLACED_ORDER:
            {
                return {
                    ...state,
                    saved: action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default placedOrderReducer;
