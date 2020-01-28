import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_PLACED_ORDER_DEFAULT_FORM = '[ORDER] GET DEFAULT ORDER FORM';
export const ADD_ORDER = '[ORDER] CREATE ORDER';
export const ADD_PRE_ORDER_TO_REDUCER = '[ORDER] ADD PRE ORDER TO REDUCER';
export const SET_DEFAULT_ORDER_VALUE = '[ORDER] SET DEFAULT ORDER VALUE';

export function addOrder(data) {
    const request = AxiosConfig.post(Constants.API_PLACED_ORDER.order, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                data = response.data;
                dispatch({
                    type: ADD_ORDER,
                    payload: data
                })
            }
            else {
                dispatch(newOrder())
            }
        }).catch(error => {
        });
}
export function acceptPreOrder(obj) {
    return (dispatch) => {
        dispatch({
            type: ADD_PRE_ORDER_TO_REDUCER,
            payload: obj
        });
    }
}
export function setDefaultOrderValue() {
    return (dispatch) => {
        dispatch({
            type: SET_DEFAULT_ORDER_VALUE
        });
    }
}
export function newOrder() {
    const data = {
        Id: 0,
        RestaurantId: '',
        BranchId: '',
        CustomerId: '',
        OrderChannelId: '',
        TableId: '',
        Code: '',
        OrderProcessId: '',
        CustomerName: '',
        OrderTime: '',
        DeliveryTime: '',
        DeliveryAddress: '',
        Tax: '',
        Price: '',
        DiscountType: '',
        Discount: '',
        FinalPrice: '',
        Description: ''
    };

    return {
        type: GET_PLACED_ORDER_DEFAULT_FORM,
        payload: data
    }
}
