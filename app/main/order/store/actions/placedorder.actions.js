import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_PLACED_ORDER = '[ADMIN] GET PLACED ORDER';
export const ADD_PLACED_ORDER = '[ADMIN] ADD PLACED ORDER';
export const SAVE_PLACED_ORDER = '[ADMIN] SAVE PLACED ORDER';

export function getPlacedOrder(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_PLACED_ORDER.order + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PLACED_ORDER,
                payload: response.data
            })
        );
}
export function addPlacedOrder(data) {

    const request = AxiosConfig.post(Constants.API_PLACED_ORDER.order, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_PLACED_ORDER,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function savePlacedOrder(data) {

    const request = AxiosConfig.put(Constants.API_PLACED_ORDER.order + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_PLACED_ORDER,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function cancelPlacedOrder(id) {

    const request = AxiosConfig.put(Constants.API_PLACED_ORDER.setcancelorder, {}, {
        params: {
            Id: id
        }
    });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newPlacedOrder() {
    const data = {
        Id: 0,
        RestaurantId: '',
        BranchId: '',
        OrderTypeId: '',
        CustomerId: '',
        OrderChannelId: '',
        TableId: '',
        Code: '',
        OrderProcessId: '',
        CustomerName: '',
        CustomerPhone: '',
        PeopleNum: 0,
        DeliveryAddress: '',
        Tax: '',
        Price: '',
        DiscountType: '',
        Discount: '',
        FinalPrice: '',
        Description: ''
    };

    return {
        type: GET_PLACED_ORDER,
        payload: data
    }
}
