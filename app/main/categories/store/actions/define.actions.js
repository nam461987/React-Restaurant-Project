import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_MENU_DEFINE = '[MENU] GET MENU DEFINE';
export const ADD_MENU_DEFINE = '[MENU] ADD MENU DEFINE';
export const SAVE_MENU_DEFINE = '[MENU] SAVE MENU DEFINE';

export function getDefine(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_MENU_DEFINE.define + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU_DEFINE,
                payload: response.data
            })
        );
}
export function addDefine(data) {

    const request = AxiosConfig.post(Constants.API_MENU_DEFINE.define, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_MENU_DEFINE,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveDefine(data) {

    const request = AxiosConfig.put(Constants.API_MENU_DEFINE.define + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_MENU_DEFINE,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newDefine() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: ''
    };

    return {
        type: GET_MENU_DEFINE,
        payload: data
    }
}
