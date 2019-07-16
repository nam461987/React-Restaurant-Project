import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_BRANCH = '[ADMIN] GET BRANCH';
export const ADD_BRANCH = '[ADMIN] ADD BRANCH';
export const SAVE_BRANCH = '[ADMIN] SAVE BRANCH';

export function getBranch(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_BRANCH.branch + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_BRANCH,
                payload: response.data
            })
        );
}
export function addBranch(data) {

    const request = AxiosConfig.post(Constants.API_BRANCH.branch, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_BRANCH,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveBranch(data) {

    const request = AxiosConfig.put(Constants.API_BRANCH.branch + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS,variant:Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_BRANCH,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newBranch() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: '',
        Address: '',
        Phone: '',
        OpenTime: '',
        CloseTime: '',
        AllDay: 0
    };

    return {
        type: GET_BRANCH,
        payload: data
    }
}
