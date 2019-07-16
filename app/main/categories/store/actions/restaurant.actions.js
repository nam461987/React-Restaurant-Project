import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_RESTAURANT = '[ADMIN] GET RESTAURANT';
export const ADD_RESTAURANT = '[ADMIN] ADD RESTAURANT';
export const SAVE_RESTAURANT = '[ADMIN] SAVE RESTAURANT';
export const CHECK_EMAIL = '[ADMIN] CHECK EMAIL EXIST';

export function getRestaurant(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_RESTAURANT.restaurant + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_RESTAURANT,
                payload: response.data
            })
        );
}
export function addRestaurant(data) {

    const request = AxiosConfig.post(Constants.API_RESTAURANT.restaurant, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_RESTAURANT,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveRestaurant(data) {

    const request = AxiosConfig.put(Constants.API_RESTAURANT.restaurant + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS,variant:Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_RESTAURANT,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function checkEmail(data) {
    const request = AxiosConfig.get(Constants.API_ACCOUNT.checkEmail + '/' + data );

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                return dispatch({
                    type: CHECK_EMAIL,
                    payload: response.data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.EMAIL_EXIST, variant: Constants.VARIANT.ERROR }));
                return dispatch({
                    type: CHECK_EMAIL,
                    payload: response.data
                })
            }
        });
}

export function newRestaurant() {
    const data = {
        Id: 0,
        Name: '',
        Phone: '',
        Address: '',
        Description: ''
    };

    return {
        type: GET_RESTAURANT,
        payload: data
    }
}
