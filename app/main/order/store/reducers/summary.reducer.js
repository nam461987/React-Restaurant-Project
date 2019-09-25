import * as Actions from '../actions';

const initialState = {
    processStatus: [],
    orderDetails: [],
    branch: null
};

const summaryReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PROCESS_STATUS_BY_ORDER_ID:
            {
                return {
                    ...state,
                    processStatus: action.payload
                };
            }
        case Actions.GET_ORER_DETAIL_BY_ORDER_ID:
            {
                return {
                    ...state,
                    orderDetails: action.payload
                };
            }
            case Actions.GET_BRANCH_INFO_BY_ORDER:
            {
                return {
                    ...state,
                    branch: action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default summaryReducer;
