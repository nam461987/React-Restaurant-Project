import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';

export const GET_ITEM_OPTIONS = 'GET ITEM OPTIONS';
export const CLEAR_OPTIONS_IN_LOGIN = 'CLEAR OPTIONS IN LOGIN';

export function getOptionsByKey(fieldName, optionUrl) {
    let options = {};
    switch (typeof optionUrl) {
        case "string":
            const request = AxiosConfig.get(optionUrl);
            const objName = 'options_' + fieldName + '_' + optionUrl;
            return (dispatch) =>
                request.then((response) => {
                    options[objName] = response.data;
                    dispatch({
                        type: GET_ITEM_OPTIONS,
                        payload: options
                    })
                }
                );
        case "object":
            {
                const objName = 'options_' + fieldName + '_array';
                options[objName] = optionUrl;
                return {
                    type: GET_ITEM_OPTIONS,
                    payload: options
                }
            }
    }
}
export function getOptionsByDependId(fieldName, optionUrl, id) {
    let options = {};
    const request = AxiosConfig.get(optionUrl, {
        params: {
            id: id
        }
    });
    const objName = 'options_' + fieldName + '_' + optionUrl;
    return (dispatch) =>
        request.then((response) => {
            options[objName] = response.data;
            dispatch({
                type: GET_ITEM_OPTIONS,
                payload: options
            })
        }
        );
}
export function ClearOptionsInLogin() {
    let options = {};
    return (dispatch) =>
        dispatch({
            type: CLEAR_OPTIONS_IN_LOGIN,
            payload: options
        });
}
