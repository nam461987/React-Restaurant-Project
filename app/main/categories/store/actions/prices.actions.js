import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_PRICES = '[ADMIN] GET PRICES';
export const GET_PRICES_BY_MENU = '[ADMIN] GET PRICES BY MENU';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getPrices(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_MENU_PRICE.price, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRICES,
                payload: response.data
            })
        );
}
export function getPricesByMenu(restaurantId, branchId, menuId, pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_MENU_PRICE.priceByMenu, {
        params: {
            RestaurantId: restaurantId,
            BranchId: branchId,
            MenuId: menuId,
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRICES_BY_MENU,
                payload: response.data
            })
        );
}
export function setPricestatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_MENU_PRICE.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getPrices(pageIndex, pageSize));
            }
        });
}