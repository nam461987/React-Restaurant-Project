import * as Actions from '../actions';

const initialState = {
    addMoreOrders:[],
    editAddMoreOrder: null
};

const addMoreOrdersReducer = function (state = initialState, action) {
    switch (action.type) {
        
        case Actions.ADD_ORDER_TO_ADD_MORE_ORDERS:
            {
                const obj = action.payload;
                let exist = false;
                // check if the order is exist in addMoreOrders, just plus Quantity and Price
                state.addMoreOrders.map(c => {
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
                    ...state.addMoreOrders.push(action.payload)
                };
            }
        case Actions.SET_EDIT_ADD_MORE_ORDER:
            {
                if (action.index > -1) {
                    state.addMoreOrders.splice(action.index, 1);
                    return {
                        ...state,
                        editAddMoreOrder: action.payload
                    };
                }
            }
        case Actions.DELETE_ADD_MORE_ORDER:
            {
                if (action.payload > -1) {
                    state.addMoreOrders.splice(action.payload, 1);
                }
                return {
                    ...state
                };
            }
        case Actions.SET_DEFAULT_ADD_MORE_ORDERS_VALUE:
            {
                return {
                    ...state,
                    addMoreOrders: []
                };
            }
        default:
            {
                return state;
            }
    }
};

export default addMoreOrdersReducer;
