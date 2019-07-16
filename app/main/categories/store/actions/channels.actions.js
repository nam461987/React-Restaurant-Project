import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_ORDER_CHANNELS = '[ADMIN] GET ORDER CHANNELS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getChannels(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_ORDER_CHANNEL.channel, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ORDER_CHANNELS,
                payload: response.data
            })
        );
}
export function setChannelstatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_ORDER_CHANNEL.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getChannels(pageIndex, pageSize));
            }
        });
}