import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_PERMISSIONS = '[ADMIN] GET PERMISSIONS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getPermissions(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_PERMISSION.permission, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PERMISSIONS,
                payload: response.data
            })
        );
}
export function setPermissionStatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_PERMISSION.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getPermissions(pageIndex, pageSize));
            }
        });
}