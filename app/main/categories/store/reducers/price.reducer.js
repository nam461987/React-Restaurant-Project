import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const priceReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PRICE:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_PRICE:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_PRICE:
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

export default priceReducer;
