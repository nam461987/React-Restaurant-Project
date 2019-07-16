import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_GROUP_FOR_GROUP_PERMISSION = '[GROUP PERMISSION] GET GROUP';
export const GET_MODULE_FOR_GROUP_PERMISSION = '[GROUP PERMISSION] GET MODULES';
export const GET_PERMISSION_FOR_GROUP_PERMISSION = '[GROUP PERMISSION] GET PERMISSIONS';

export function getGroupForGroupPermission() {
    const request = AxiosConfig.get(Constants.API_GROUP_PERMISSION.getgroup);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_GROUP_FOR_GROUP_PERMISSION,
                payload: response.data
            })
        });
}
export function getModuleForGroupPermission() {
    const request = AxiosConfig.get(Constants.API_GROUP_PERMISSION.getmodule);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MODULE_FOR_GROUP_PERMISSION,
                payload: response.data
            })
        );
}
export function getPermissionForGroupPermission(groupId, Module) {
    const request = AxiosConfig.get(Constants.API_GROUP_PERMISSION.getpermission, {
        params: {
            groupId: groupId,
            module: Module
        }
    });

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_PERMISSION_FOR_GROUP_PERMISSION,
                payload: response.data
            })
        }

        );
}
export function updateGroupPermission(groupId, permissionId, status) {
    const request = AxiosConfig.put(Constants.API_GROUP_PERMISSION.grouppermission, {}, {
        params: {
            groupId: groupId,
            permissionId: permissionId,
            status: status
        }
    });

    return () =>
        request.then((response) => {
        });
}