import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_PLACED_ORDERS = '[ADMIN] GET PLACED ORDERS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getPlacedOrders(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_PLACED_ORDER.order, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PLACED_ORDERS,
                payload: response.data
            })
        );
}
export function setPlacedOrderstatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_PLACED_ORDER.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getPlacedOrders(pageIndex, pageSize));
            }
        });
}