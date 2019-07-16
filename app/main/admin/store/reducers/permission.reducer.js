import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const permissionReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PERMISSION:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_PERMISSION:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_PERMISSION:
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

export default permissionReducer;
