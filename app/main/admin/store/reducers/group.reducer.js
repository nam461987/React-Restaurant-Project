import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const groupReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_GROUP:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_GROUP:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_GROUP:
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

export default groupReducer;
