import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_ALL_CATEGORIES = '[ORDER] GET ALL CATEGORIES';
export const GET_ALL_MENUS = '[ORDER] GET ALL MENUS';
export const GET_ALL_PRICES = '[ORDER] GET ALL PRICES';
export const GET_ALL_CUSTOMERS = '[ORDER] GET ALL CUSTOMERS';
export const GET_ALL_ORDER_CHANNELS = '[ORDER] GET ALL ORDER CHANNELS';
export const GET_ALL_TABLES = '[ORDER] GET ALL TABLES';
export const ADD_ORDER_TO_ORDERS = '[ORDER] ADD ORDER TO ORDERS';
export const DELETE_ORDER = '[ORDER] DELETE ORDER';
export const SET_EDIT_ORDER = '[ORDER] SET EDIT ORDER';
export const ADD_PLACED_ORDER_DETAIL = '[ORDER] ADD ORDER DETAIL';
export const SET_DEFAULT_ORDERS_VALUE = '[ORDER] SET DEFAULT ORDERS VALUE';

export function getCategories() {
    const request = AxiosConfig.get(Constants.API_MENU_CATEGORY.categoryGetAll);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: response.data
            })
        );
}
export function getMenus() {
    const request = AxiosConfig.get(Constants.API_MENU.menuGetAll);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_MENUS,
                payload: response.data
            })
        );
}
export function getPrices() {
    const request = AxiosConfig.get(Constants.API_MENU_PRICE.priceGetAll);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_PRICES,
                payload: response.data
            })
        );
}
export function acceptOrder(obj) {
    return (dispatch) => {
        dispatch(showMessage({ message: Constants.MODAL.ORDER_ADDED, variant: Constants.VARIANT.SUCCESS }));
        dispatch({
            type: ADD_ORDER_TO_ORDERS,
            payload: obj
        });
    }
}
export function deleteOrder(index) {
    return (dispatch) => {
        dispatch(showMessage({ message: Constants.MODAL.ORDER_DELETED, variant: Constants.VARIANT.SUCCESS }));
        dispatch({
            type: DELETE_ORDER,
            payload: index
        });
    }
}
export function setEditOrder(index, obj) {
    return (dispatch) => {
        dispatch({
            type: SET_EDIT_ORDER,
            payload: obj,
            index: index
        });
    }
}
export function addOrderDetail(data) {
    const request = AxiosConfig.post(Constants.API_PLACED_ORDER_DETAIL.orderDetail, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_PLACED_ORDER_DETAIL,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function getCustomers() {
    const request = AxiosConfig.get(Constants.API_CUSTOMERS.customerGetAll);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_CUSTOMERS,
                payload: response.data
            })
        );
}
export function getOrderChannels() {
    const request = AxiosConfig.get(Constants.API_ORDER_CHANNEL.channelGetAll);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_ORDER_CHANNELS,
                payload: response.data
            })
        );
}
export function getTables() {
    const request = AxiosConfig.get(Constants.API_TABLE.tableGetAll);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_TABLES,
                payload: response.data
            })
        );
}
export function setDefaultOrdersValue() {
    return (dispatch) => {
        dispatch({
            type: SET_DEFAULT_ORDERS_VALUE
        });
    }
}