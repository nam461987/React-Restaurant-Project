import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_ORDER_PROCESS = '[ADMIN] GET ORDER PROCESS';
export const ADD_ORDER_PROCESS = '[ADMIN] ADD ORDER PROCESS';
export const SAVE_ORDER_PROCESS = '[ADMIN] SAVE ORDER PROCESS';

export function getProcess(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_ORDER_PROCESS.process + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ORDER_PROCESS,
                payload: response.data
            })
        );
}
export function addProcess(data) {

    const request = AxiosConfig.post(Constants.API_ORDER_PROCESS.process, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_ORDER_PROCESS,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveProcess(data) {

    const request = AxiosConfig.put(Constants.API_ORDER_PROCESS.process + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_ORDER_PROCESS,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newProcess() {
    const data = {
        Id: 0,
        Name: '',
        Color: '',
        Description:''
    };

    return {
        type: GET_ORDER_PROCESS,
        payload: data
    }
}
