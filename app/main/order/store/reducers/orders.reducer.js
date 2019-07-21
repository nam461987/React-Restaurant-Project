import * as Actions from '../actions';
import { stat } from 'fs';

const initialState = {
    categories: [],
    menus: [],
    prices: [],
    orders: []
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
        case Actions.DELETE_ORDER:
            {
                if (action.payload > -1) {
                    state.orders.splice(action.payload, 1);
                }
                console.log(state.orders);
                return {
                    ...state
                };
            }
        default:
            {
                return state;
            }
    }
};

export default ordersReducer;
