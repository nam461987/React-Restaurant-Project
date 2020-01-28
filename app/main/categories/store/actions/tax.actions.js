import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_TAX = '[CATEGORY] GET TAX';
export const ADD_TAX = '[CATEGORY] ADD TAX';
export const SAVE_TAX = '[CATEGORY] SAVE TAX';

export function getTax(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_TAX.tax + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TAX,
                payload: response.data
            })
        );
}
export function addTax(data) {

    const request = AxiosConfig.post(Constants.API_TAX.tax, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_TAX,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveTax(data) {

    const request = AxiosConfig.put(Constants.API_TAX.tax + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_TAX,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newTax() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: '',
        UnitId: '',
        Description: ''
    };

    return {
        type: GET_TAX,
        payload: data
    }
}
