import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_WAITING_ORDERS = '[ORDER] GET WAITING ORDERS';
export const GET_WAITING_ORDERS_DETAIL = '[ORDER] GET WAITING ORDERS DETAIL';
export const SET_FINISH_ORDERS_DETAIL = '[ORDER] SET FINISH ORDERS DETAIL';
export const SET_COMPLETE_ORDER = '[ORDER] SET COMPLETE ORDER';
export const SET_ORDERS_SEARCH_TEXT = '[ORDER] SET ORDERS SEARCH TEXT';
export const SET_ORDERS_CATEGORY_FILTER = '[ORDER] SET ORDERS CATEGORY FILTER';

export function getWaitingOrders() {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_PLACED_ORDER.waitingOrder);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_WAITING_ORDERS,
                payload: response.data
            })
        );
}
export function getWaitingOrdersDetail() {

    const request = AxiosConfig.get(Constants.API_PLACED_ORDER_DETAIL.waitingOrderDetail);

    return (dispatch) =>
        request.then((response) => {

            return dispatch({
                type: GET_WAITING_ORDERS_DETAIL,
                payload: response.data
            })
        });
}
export function setFinishOrderDetail(id, isFinish) {
    const request = AxiosConfig.put(Constants.API_PLACED_ORDER_DETAIL.setfinishorderdetail, {}, {
        params: {
            Id: id,
            IsFinish: isFinish
        }
    });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SET_FINISH_ORDERS_DETAIL,
                    payload: response.data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }

        });
}
export function setCompleteOrder(obj) {
    const request = AxiosConfig.put(Constants.API_PLACED_ORDER.setcompleteorder, obj);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
            return response.data;
        });
}
export function setOrdersSearchText(event) {
    return {
        type: SET_ORDERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function setCategoryFilter(event) {
    return {
        type: SET_ORDERS_CATEGORY_FILTER,
        category: event.target.value
    }
}