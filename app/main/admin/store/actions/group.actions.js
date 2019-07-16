import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_GROUP = '[ADMIN] GET GROUP';
export const ADD_GROUP = '[ADMIN] ADD GROUP';
export const SAVE_GROUP = '[ADMIN] SAVE GROUP';

export function getGroup(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_GROUP.group + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_GROUP,
                payload: response.data
            })
        );
}
export function addGroup(data) {

    const request = AxiosConfig.post(Constants.API_GROUP.group, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_GROUP,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveGroup(data) {

    const request = AxiosConfig.put(Constants.API_GROUP.group + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS,variant:Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_GROUP,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newGroup() {
    const data = {
        Id: 0,
        Name: '',
        Code: '',
        Description: '',
        CreatedDate: "2019-06-19T05:43:24.646Z"
    };

    return {
        type: GET_GROUP,
        payload: data
    }
}
