import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const tableReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_TABLE:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_TABLE:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_TABLE:
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

export default tableReducer;
