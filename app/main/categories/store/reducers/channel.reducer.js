import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const channelReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ORDER_CHANNEL:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_ORDER_CHANNEL:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_ORDER_CHANNEL:
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

export default channelReducer;
