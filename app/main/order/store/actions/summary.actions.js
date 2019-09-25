import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import { showMessage } from 'app/store/actions/fuse';

export const GET_PROCESS_STATUS_BY_ORDER_ID = '[ORDER] GET PROCESS STATUS BY ORDER ID';
export const GET_ORER_DETAIL_BY_ORDER_ID = '[ORDER] GET ORDER DETAIL BY ORDER ID';
export const GET_BRANCH_INFO_BY_ORDER='[ORDER] GET BRANCH INFORMATION BY ORDER';

export function getProcessStatusByOrderId(params) {
    const request = AxiosConfig.get(Constants.API_PLACED_ORDER_PROCESS_STATUS.getbyorderid, {
        params: {
            OrderId: params.id
        }
    });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                return dispatch({
                    type: GET_PROCESS_STATUS_BY_ORDER_ID,
                    payload: response.data
                })
            }
        });
}
export function getOrderDetailByOrderId(params) {
    const request = AxiosConfig.get(Constants.API_PLACED_ORDER_DETAIL.getorderdetailbyorderid, {
        params: {
            OrderId: params.id
        }
    });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                return dispatch({
                    type: GET_ORER_DETAIL_BY_ORDER_ID,
                    payload: response.data
                })
            }
        });
}
export function getBranchByOrder(id) {
    const request = AxiosConfig.get(Constants.API_BRANCH.branch + "/" + id);

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                return dispatch({
                    type: GET_BRANCH_INFO_BY_ORDER,
                    payload: response.data
                })
            }
        });
}