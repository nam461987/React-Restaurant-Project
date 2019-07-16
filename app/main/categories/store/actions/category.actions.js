import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_MENU_CATEGORY = '[ADMIN] GET MENU CATEGORY';
export const ADD_MENU_CATEGORY = '[ADMIN] ADD MENU CATEGORY';
export const SAVE_MENU_CATEGORY = '[ADMIN] SAVE MENU CATEGORY';

export function getCategory(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_MENU_CATEGORY.category + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU_CATEGORY,
                payload: response.data
            })
        );
}
export function addCategory(data) {

    const request = AxiosConfig.post(Constants.API_MENU_CATEGORY.category, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_MENU_CATEGORY,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveCategory(data) {

    const request = AxiosConfig.put(Constants.API_MENU_CATEGORY.category + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_MENU_CATEGORY,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newCategory() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: '',
        Description: ''
    };

    return {
        type: GET_MENU_CATEGORY,
        payload: data
    }
}
