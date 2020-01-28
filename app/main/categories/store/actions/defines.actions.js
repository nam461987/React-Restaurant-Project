import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_MENU_DEFINES = '[MENU] GET MENU DEFINES';
export const SET_STATUS = '[MENU] SET STATUS';

export function getDefines(pageIndex, pageSize, data) {
    const request = AxiosConfig.get(Constants.API_MENU_DEFINE.define, {
        params: {
            menuId: data.menuid,
            sizeId: data.sizeid,
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU_DEFINES,
                payload: response.data
            })
        );
}
export function setDefinestatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_MENU_DEFINE.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getDefines(pageIndex, pageSize, data));
            }
        });
}