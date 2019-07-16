import * as Actions from '../actions';

const initialState = {
    data: []
};

const restaurantsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_RESTAURANTS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default restaurantsReducer;
