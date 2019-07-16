import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_ACCOUNT = '[ADMIN] GET ACCOUNT';
export const ADD_ACCOUNT = '[ADMIN] ADD ACCOUNT';
export const SAVE_ACCOUNT = '[ADMIN] SAVE ACCOUNT';
export const CHECK_USER_NAME = '[ADMIN] CHECK USER NAME EXIST';
export const CHECK_EMAIL = '[ADMIN] CHECK EMAIL EXIST';

export function getAccount(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_ACCOUNT.account + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ACCOUNT,
                payload: response.data
            })
        );
}
export function addAccount(data) {

    const request = AxiosConfig.post(Constants.API_ACCOUNT.account, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_ACCOUNT,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveAccount(data) {

    const request = AxiosConfig.put(Constants.API_ACCOUNT.account + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS,variant:Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_ACCOUNT,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}

export function checkUserName(data) {
    const request = AxiosConfig.get(Constants.API_ACCOUNT.checkUserName + '/' + data );

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                return dispatch({
                    type: CHECK_USER_NAME,
                    payload: response.data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.USER_EXIST, variant: Constants.VARIANT.ERROR }));
                return dispatch({
                    type: CHECK_USER_NAME,
                    payload: response.data
                })
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

export function newAccount() {
    const data = {
        Id: 0,
        RestaurantId: '',
        BranchId: '',
        TypeId: '',
        UserName: '',
        Email: '',
        Mobile: '',
        FullName: '',
        BirthDate: "2019-06-19T05:43:24.646Z",
        StateId: '',
        CityId: '',
        Zip: '',
        Address: '',
        Avatar: ''
    };

    return {
        type: GET_ACCOUNT,
        payload: data
    }
}
