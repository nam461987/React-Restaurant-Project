import * as Actions from '../actions';

const initialState = {
    groups: [],
    modules: [],
    permissions: []
};

const groupPermissionReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_GROUP_FOR_GROUP_PERMISSION:
            {
                return {
                    ...state,
                    groups: action.payload
                };
            }
        case Actions.GET_MODULE_FOR_GROUP_PERMISSION:
            {
                return {
                    ...state,
                    modules: action.payload
                };
            }
        case Actions.GET_PERMISSION_FOR_GROUP_PERMISSION:
            {
                return {
                    ...state,
                    permissions: action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default groupPermissionReducer;
