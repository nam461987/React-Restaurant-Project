import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

export const GET_BRANCHS = '[ADMIN] GET BRANCHS';
export const SET_STATUS = '[ADMIN] SET STATUS';

export function getBranchs(pageIndex, pageSize) {
    const request = AxiosConfig.get(Constants.API_BRANCH.branch, {
        params: {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_BRANCHS,
                payload: response.data
            })
        );
}
export function setBranchStatus(data, pageIndex, pageSize) {
    const request = AxiosConfig.put(Constants.API_BRANCH.active, {}, { params: { id: data.id, Status: data.status } });

    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                dispatch(getBranchs(pageIndex, pageSize));
            }
        });
}