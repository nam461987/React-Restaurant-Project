import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_ALL_CATEGORIES = '[ORDER] GET ALL CATEGORIES';
export const GET_ALL_MENUS = '[ORDER] GET ALL MENUS';
export const GET_ALL_PRICES = '[ORDER] GET ALL PRICES';
export const ADD_ORDER_TO_ORDERS = '[ORDER] ADD ORDER TO ORDERS';
export const DELETE_ORDER = '[ORDER] DELETE ORDER';

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
    console.log('run');
    return (dispatch) => {
        dispatch(showMessage({ message: Constants.MODAL.ORDER_DELETED, variant: Constants.VARIANT.SUCCESS }));
        dispatch({
            type: DELETE_ORDER,
            payload: index
        });
    }
}