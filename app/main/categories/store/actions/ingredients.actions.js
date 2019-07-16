import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_INGREDIENTS = '[ADMIN] GET INGREDIENTS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getIngredients(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_INGREDIENT.ingredient, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INGREDIENTS,
                payload: response.data
            })
        );
}
export function setIngredientStatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_INGREDIENT.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getIngredients(pageIndex, pageSize));
            }
        });
}