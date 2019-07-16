import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_RESTAURANTS = '[ADMIN] GET RESTAURANTS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getRestaurants(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_RESTAURANT.restaurant, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_RESTAURANTS,
                payload: response.data
            })
        );
}
export function setRestaurantStatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_RESTAURANT.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getRestaurants(pageIndex, pageSize));
            }
        });
}