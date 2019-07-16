import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_INGREDIENT = '[ADMIN] GET INGREDIENT';
export const ADD_INGREDIENT = '[ADMIN] ADD INGREDIENT';
export const SAVE_INGREDIENT = '[ADMIN] SAVE INGREDIENT';

export function getIngredient(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_INGREDIENT.ingredient + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INGREDIENT,
                payload: response.data
            })
        );
}
export function addIngredient(data) {

    const request = AxiosConfig.post(Constants.API_INGREDIENT.ingredient, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_INGREDIENT,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveIngredient(data) {

    const request = AxiosConfig.put(Constants.API_INGREDIENT.ingredient + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_INGREDIENT,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newIngredient() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: '',
        UnitId: '',
        Description: ''
    };

    return {
        type: GET_INGREDIENT,
        payload: data
    }
}
