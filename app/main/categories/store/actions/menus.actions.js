import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_MENUS = '[ADMIN] GET MENUS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getMenus(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_MENU.menu, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENUS,
                payload: response.data
            })
        );
}
export function setMenustatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_MENU.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getMenus(pageIndex, pageSize));
            }
        });
}