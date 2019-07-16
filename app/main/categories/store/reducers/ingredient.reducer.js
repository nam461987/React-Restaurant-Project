import * as Actions from '../actions';

const initialState = {
    data: null,
    added: false,
    saved: false
};

const ingredientReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_INGREDIENT:
            {
                return {
                    ...state,
                    data: action.payload
                };
            }
        case Actions.ADD_INGREDIENT:
            {
                return {
                    ...state,
                    added: true
                };
            }
        case Actions.SAVE_INGREDIENT:
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

export default ingredientReducer;
