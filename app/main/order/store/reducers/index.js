import {combineReducers} from 'redux';
import orders from './orders.reducer';
import order from './order.reducer';
import placedOrders from './placedorders.reducer';
import placedOrder from './placedorder.reducer';
import waitingOrder from './waitingorder.reducer';
import addMoreOrders from './addmoreorders.reducer';
import summary from './summary.reducer';

const reducer = combineReducers({
    orders,
    order,
    placedOrders,
    placedOrder,
    waitingOrder,
    addMoreOrders,
    summary
});

export default reducer;
