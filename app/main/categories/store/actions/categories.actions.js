import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_MENU_CATEGORIES = '[ADMIN] GET MENU CATEGORIES';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getCategories(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_MENU_CATEGORY.category, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU_CATEGORIES,
                payload: response.data
            })
        );
}
export function setCategoriestatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_MENU_CATEGORY.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getCategories(pageIndex, pageSize));
            }
        });
}