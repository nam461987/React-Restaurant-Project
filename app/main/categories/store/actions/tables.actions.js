import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_TABLES = '[CATEGORY] GET TABLE';
export const SET_STATUS = '[CATEGORY] SET STATUS';

export function getSeatTables(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_TABLE.table, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TABLES,
                payload: response.data
            })
        );
}
export function setSeatTablestatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_TABLE.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getSeatTables(pageIndex, pageSize));
            }
        });
}