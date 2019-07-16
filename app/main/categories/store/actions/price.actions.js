import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_PRICE = '[ADMIN] GET PRICE';
export const ADD_PRICE = '[ADMIN] ADD PRICE';
export const SAVE_PRICE = '[ADMIN] SAVE PRICE';

export function getPrice(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_MENU_PRICE.price + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRICE,
                payload: response.data
            })
        );
}
export function addPrice(data) {

    const request = AxiosConfig.post(Constants.API_MENU_PRICE.price, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_PRICE,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function savePrice(data) {

    const request = AxiosConfig.put(Constants.API_MENU_PRICE.price + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_PRICE,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newPrice() {
    const data = {
        Id: 0,
        RestaurantId: '',
        SizeId: '',
        Price: ''
    };

    return {
        type: GET_PRICE,
        payload: data
    }
}
