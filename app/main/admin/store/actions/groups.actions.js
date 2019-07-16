import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_GROUPS = '[ADMIN] GET GROUPS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getGroups(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_GROUP.group, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_GROUPS,
                payload: response.data
            })
        );
}
export function setGroupStatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_GROUP.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getGroups(pageIndex, pageSize));
            }
        });
}