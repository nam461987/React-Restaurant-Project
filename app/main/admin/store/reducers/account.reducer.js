import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false,
    userCanUse: false,
    emailCanUse: false
};

const accountReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ACCOUNT:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_ACCOUNT:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_ACCOUNT:
            {
                return {
                    ...state,
                    saved: action.payload
                };
            }
        case Actions.CHECK_USER_NAME:
            {
                return {
                    ...state,
                    userCanUse: action.payload
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

export default accountReducer;
