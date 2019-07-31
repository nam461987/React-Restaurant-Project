import * as Actions from '../actions';

const initialState = {
    data: []
};

const processesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ORDER_PROCESSES:
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

export default processesReducer;
