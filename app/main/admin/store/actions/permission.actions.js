import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_PERMISSION = '[ADMIN] GET PERMISSION';
export const ADD_PERMISSION = '[ADMIN] ADD PERMISSION';
export const SAVE_PERMISSION = '[ADMIN] SAVE PERMISSION';

export function getPermission(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_PERMISSION.permission + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PERMISSION,
                payload: response.data
            })
        );
}
export function addPermission(data) {

    const request = AxiosConfig.post(Constants.API_PERMISSION.permission, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_PERMISSION,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function savePermission(data) {

    const request = AxiosConfig.put(Constants.API_PERMISSION.permission + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS,variant:Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_PERMISSION,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newPermission() {
    const data = {
        Id: 0,
        Name: '',
        Code: '',
        Description: '',
        CreatedDate: "2019-06-19T05:43:24.646Z"
    };

    return {
        type: GET_PERMISSION,
        payload: data
    }
}
