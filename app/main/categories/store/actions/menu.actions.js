import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_MENU = '[ADMIN] GET MENU';
export const ADD_MENU = '[ADMIN] ADD MENU';
export const SAVE_MENU = '[ADMIN] SAVE MENU';

export function getMenu(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_MENU.menu + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU,
                payload: response.data
            })
        );
}
export function addMenu(data) {

    const request = AxiosConfig.post(Constants.API_MENU.menu, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_MENU,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveMenu(data) {

    const request = AxiosConfig.put(Constants.API_MENU.menu + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_MENU,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newMenu() {
    const data = {
        Id: 0,
        RestaurantId: '',
        CategoryId: '',
        Name: '',
        Image: '',
        UnitId: '',
        Description: ''
    };

    return {
        type: GET_MENU,
        payload: data
    }
}
