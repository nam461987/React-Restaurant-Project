import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_MENU_UNIT = '[ADMIN] GET MENU UNIT';
export const ADD_MENU_UNIT = '[ADMIN] ADD MENU UNIT';
export const SAVE_MENU_UNIT = '[ADMIN] SAVE MENU UNIT';

export function getUnit(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_MENU_UNIT.unit + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU_UNIT,
                payload: response.data
            })
        );
}
export function addUnit(data) {

    const request = AxiosConfig.post(Constants.API_MENU_UNIT.unit, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_MENU_UNIT,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveUnit(data) {

    const request = AxiosConfig.put(Constants.API_MENU_UNIT.unit + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_MENU_UNIT,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newUnit() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: ''
    };

    return {
        type: GET_MENU_UNIT,
        payload: data
    }
}
