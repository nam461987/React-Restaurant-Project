import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import * as Actions from '../actions';

export const SET_STATUS = '[ORDER DETAILS] SET STATUS';

export function setPlacedOrderDetailstatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_PLACED_ORDER_DETAIL.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            dispatch(Actions.getOrderDetailByOrderId({ id: data.parentId }))
        });
}