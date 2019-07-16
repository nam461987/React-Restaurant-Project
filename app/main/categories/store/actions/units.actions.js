import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_MENU_UNITS = '[ADMIN] GET MENU UNITS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getUnits(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_MENU_UNIT.unit, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU_UNITS,
                payload: response.data
            })
        );
}
export function setUnitstatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_MENU_UNIT.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getUnits(pageIndex, pageSize));
            }
        });
}