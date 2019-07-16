import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_MENU_SIZE = '[ADMIN] GET MENU SIZE';
export const ADD_MENU_SIZE = '[ADMIN] ADD MENU SIZE';
export const SAVE_MENU_SIZE = '[ADMIN] SAVE MENU SIZE';

export function getSize(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_MENU_SIZE.size + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU_SIZE,
                payload: response.data
            })
        );
}
export function addSize(data) {

    const request = AxiosConfig.post(Constants.API_MENU_SIZE.size, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_MENU_SIZE,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveSize(data) {

    const request = AxiosConfig.put(Constants.API_MENU_SIZE.size + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_MENU_SIZE,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newSize() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: ''
    };

    return {
        type: GET_MENU_SIZE,
        payload: data
    }
}
