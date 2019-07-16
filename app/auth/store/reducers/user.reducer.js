import * as Actions from '../actions';

const initialState = {
    permissions: [],
    data: {
        'displayName': 'Nam To',
        'photoURL': 'assets/images/avatars/Velazquez.jpg',
        'email': 'namhdto@gmail.com'
    }
};

const user = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_USER_DATA:
            {
                return Object.assign({}, state, {
                    ...action.payload
                })
            }
        case Actions.REMOVE_USER_DATA:
            {
                return {
                    ...initialState
                };
            }
        case Actions.USER_LOGGED_OUT:
            {
                return initialState;
            }
        default:
            {
                return state
            }
    }
};

export default user;
