import * as Actions from '../actions';

const initialState = {};

const optionsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ITEM_OPTIONS:
            {
                return {
                    ...state,
                    ...action.payload
                };
            }
        case Actions.CLEAR_OPTIONS_IN_LOGIN:
            {
                return {
                    ...action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default optionsReducer;
