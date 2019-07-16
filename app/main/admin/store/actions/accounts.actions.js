import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_ACCOUNTS = '[ADMIN] GET ACCOUNTS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getAccounts(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_ACCOUNT.account,{
        params: {
            pageIndex: pageIndex,
            pageSize : pageSize
        }});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ACCOUNTS,
                payload: response.data
            })
        );
}
export function setAccountStatus(data) {
    // be careful with Active field, only account table push value as Active
    const request = AxiosConfig.put(Constants.API_ACCOUNT.active, {}, { params: { id: data.id, Active: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getAccounts());
            }
        });
}
export function resendAciveEmail(id) {
    const request = AxiosConfig.get(Constants.API_ACCOUNT.resendactiveaccountemail, { params: { Id: id } });

    return (dispatch) =>
    request.then((response) => {
        if (response.data) {
            dispatch(showMessage({ message: Constants.MODAL.RESEND_ACTIVE_EMAIL_SUCCESS, variant: Constants.VARIANT.SUCCESS }));
        }
        else {
            dispatch(showMessage({ message: Constants.MODAL.RESEND_ACTIVE_EMAIL_FAIL, variant: Constants.VARIANT.ERROR }));
        }
    });
}