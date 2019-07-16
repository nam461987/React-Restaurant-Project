import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_ORDER_CHANNEL = '[ADMIN] GET ORDER CHANNEL';
export const ADD_ORDER_CHANNEL = '[ADMIN] ADD ORDER CHANNEL';
export const SAVE_ORDER_CHANNEL = '[ADMIN] SAVE ORDER CHANNEL';

export function getChannel(params) {
    // const request = axios.get('/api/e-commerce-app/product', { params });
    const request = AxiosConfig.get(Constants.API_ORDER_CHANNEL.channel + "/" + params);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ORDER_CHANNEL,
                payload: response.data
            })
        );
}
export function addChannel(data) {

    const request = AxiosConfig.post(Constants.API_ORDER_CHANNEL.channel, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: ADD_ORDER_CHANNEL,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function saveChannel(data) {

    const request = AxiosConfig.put(Constants.API_ORDER_CHANNEL.channel + "/" + data.Id, data);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS }));

                return dispatch({
                    type: SAVE_ORDER_CHANNEL,
                    payload: data
                })
            }
            else {
                dispatch(showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR }));
            }
        });
}
export function newChannel() {
    const data = {
        Id: 0,
        RestaurantId: '',
        Name: '',
        Description:''
    };

    return {
        type: GET_ORDER_CHANNEL,
        payload: data
    }
}
