import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_MENU_SIZES = '[ADMIN] GET MENU SIZES';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getSizes(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_MENU_SIZE.size, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MENU_SIZES,
                payload: response.data
            })
        );
}
export function setSizestatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_MENU_SIZE.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getSizes(pageIndex, pageSize));
            }
        });
}