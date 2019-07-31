import * as Actions from '../actions';

const initialState = {
    waitingOrder: [],
    waitingOrderDetail: [],
    searchText    : '',
    categoryFilter: 'all'
};

const placedOrderReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_WAITING_ORDERS:
            {
                return {
                    ...state,
                    waitingOrder: action.payload
                };
            }
        case Actions.GET_WAITING_ORDERS_DETAIL:
            {
                return {
                    ...state,
                    waitingOrderDetail: action.payload
                };
            }
        case Actions.SET_FINISH_ORDERS_DETAIL:
            {
                return {
                    ...state
                }
            }
        case Actions.SET_COMPLETE_ORDER:
            {
                return {
                    ...state
                }
            }
        case Actions.SET_ORDERS_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        case Actions.SET_ORDERS_CATEGORY_FILTER:
            {
                return {
                    ...state,
                    categoryFilter: action.category
                };
            }
        default:
            {
                return state;
            }
    }
};

export default placedOrderReducer;
