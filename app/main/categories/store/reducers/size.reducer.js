import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const sizeReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_MENU_SIZE:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_MENU_SIZE:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_MENU_SIZE:
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

export default sizeReducer;
