import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false,
    emailCanUse: false
};

const restaurantReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_RESTAURANT:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_RESTAURANT:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_RESTAURANT:
            {
                return {
                    ...state,
                    saved: action.payload
                };
            }
        case Actions.CHECK_EMAIL:
            {
                return {
                    ...state,
                    emailCanUse: action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default restaurantReducer;
