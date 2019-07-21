import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_TABLE = '[CATEGORY] GET TABLE';
export const ADD_TABLE = '[CATEGORY] ADD TABLE';
export const SAVE_TABLE = '[CATEGORY] SAVE TABLE';

export function getSeatTable(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_TABLE.table + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TABLE,
                payload: response.data
            })
        );
}
export function addSeatTable(data) {

    const request = AxiosConfig.post(Constants.API_TABLE.table, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_TABLE,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveSeatTable(data) {

    const request = AxiosConfig.put(Constants.API_TABLE.table + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_TABLE,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newSeatTable() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: ''
    };

    return {
        type: GET_TABLE,
        payload: data
    }
}
