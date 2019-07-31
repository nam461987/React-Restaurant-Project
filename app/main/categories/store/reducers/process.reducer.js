import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const processReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ORDER_PROCESS:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_ORDER_PROCESS:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_ORDER_PROCESS:
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

export default processReducer;
