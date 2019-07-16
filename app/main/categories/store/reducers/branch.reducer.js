import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const branchReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_BRANCH:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_BRANCH:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_BRANCH:
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

export default branchReducer;
