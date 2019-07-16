import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const menuReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_MENU:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_MENU:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_MENU:
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

export default menuReducer;
