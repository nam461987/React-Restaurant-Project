import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const ADD_ORDER_TO_ADD_MORE_ORDERS = '[ADD MORE ORDERS] ADD ORDER TO ADD MORE ORDERS';
export const DELETE_ADD_MORE_ORDER = '[ADD MORE ORDERS] DELETE ADD MORE ORDER';
export const SET_EDIT_ADD_MORE_ORDER = '[ADD MORE ORDERS] SET EDIT ADD MORE ORDER';
export const ADD_PLACED_ORDER_DETAIL = '[ADD MORE ORDERS] ADD ORDER DETAIL';
export const SET_DEFAULT_ADD_MORE_ORDERS_VALUE = '[ADD MORE ORDERS] SET DEFAULT ADD MORE ORDERS VALUE';

export function acceptAddMoreOrder(obj) {
    return (dispatch) => {
        dispatch(showMessage({ message: Constants.MODAL.ORDER_ADDED, variant: Constants.VARIANT.SUCCESS }));
        dispatch({
            type: ADD_ORDER_TO_ADD_MORE_ORDERS,
            payload: obj
        });
    }
}
export function deleteAddMoreOrder(index) {
    return (dispatch) => {
        dispatch(showMessage({ message: Constants.MODAL.ORDER_DELETED, variant: Constants.VARIANT.SUCCESS }));
        dispatch({
            type: DELETE_ADD_MORE_ORDER,
            payload: index
        });
    }
}
export function setEditAddMoreOrder(index, obj) {
    return (dispatch) => {
        dispatch({
            type: SET_EDIT_ADD_MORE_ORDER,
            payload: obj,
            index: index
        });
    }
}
export function setDefaultAddMoreOrdersValue() {
    return (dispatch) => {
        dispatch({
            type: SET_DEFAULT_ADD_MORE_ORDERS_VALUE
        });
    }
}
export function setOrderMoreOrderProcess(id) {
    const request = AxiosConfig.put(Constants.API_PLACED_ORDER.setordermoreorder,{}, {
        params: {
            Id: id
        }});

    return (dispatch) =>
        request.then((response) => {
            return response.data;
        });
}