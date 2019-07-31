import * as Actions from '../actions';

const initialState = {
    categories: [],
    menus: [],
    prices: [],
    orders: [],
    customers: [],
    tables: [],
    orderChannels: [],
    editOrder: null
};

const ordersReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_CATEGORIES:
            {
                return {
                    ...state,
                    categories: action.payload
                };
            }
        case Actions.GET_ALL_MENUS:
            {
                return {
                    ...state,
                    menus: action.payload
                };
            }
        case Actions.GET_ALL_PRICES:
            {
                return {
                    ...state,
                    prices: action.payload
                };
            }
        case Actions.ADD_ORDER_TO_ORDERS:
            {
                const obj = action.payload;
                let exist = false;
                // check if the order is exist in orders, just plus Quantity and Price
                state.orders.map(c => {
                    if (c.CategoryId === obj.CategoryId &&
                        c.MenuId === obj.MenuId &&
                        c.MenuPriceId === obj.MenuPriceId &&
                        c.Description === obj.Description) {
                        c.Quantity = parseInt(c.Quantity) + parseInt(obj.Quantity);
                        c.Price = c.Price + obj.Price;
                        exist = true;
                    }
                })
                if (exist) {
                    return {
                        ...state
                    }
                }
                return {
                    ...state,
                    ...state.orders.push(action.payload)
                };
            }
        case Actions.SET_EDIT_ORDER:
            {
                if (action.index > -1) {
                    state.orders.splice(action.index, 1);
                    return {
                        ...state,
                        editOrder: action.payload
                    };
                }
            }
        case Actions.DELETE_ORDER:
            {
                if (action.payload > -1) {
                    state.orders.splice(action.payload, 1);
                }
                return {
                    ...state
                };
            }
        case Actions.ADD_PLACED_ORDER_DETAIL:
            {
                return {
                    ...state
                };
            }
        case Actions.GET_ALL_CUSTOMERS:
            {
                return {
                    ...state,
                    customers: action.payload
                };
            }
        case Actions.GET_ALL_TABLES:
            {
                return {
                    ...state,
                    tables: action.payload
                };
            }
        case Actions.GET_ALL_ORDER_CHANNELS:
            {
                return {
                    ...state,
                    orderChannels: action.payload
                };
            }
        case Actions.SET_DEFAULT_ORDERS_VALUE:
            {
                return {
                    ...state,
                    orders: []
                };
            }
        default:
            {
                return state;
            }
    }
};

export default ordersReducer;
