import * as Actions from '../actions';

const initialState = {
    data: []
};

const channelsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ORDER_CHANNELS:
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

export default channelsReducer;
