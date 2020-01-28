import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_TAXES = '[ADMIN] GET TAXES';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getTaxes(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_TAX.tax, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TAXES,
                payload: response.data
            })
        );
}
export function setTaxStatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_TAX.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getTaxes(pageIndex, pageSize));
            }
        });
}