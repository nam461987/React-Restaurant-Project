import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const taxReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_TAX:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_TAX:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_TAX:
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

export default taxReducer;
