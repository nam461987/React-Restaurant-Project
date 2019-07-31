import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_ORDER_PROCESSES = '[ADMIN] GET ORDER PROCESSES';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getProcesses(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_ORDER_PROCESS.process, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ORDER_PROCESSES,
                payload: response.data
            })
        );
}
export function setProcessestatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_ORDER_PROCESS.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getProcesses(pageIndex, pageSize));
            }
        });
}