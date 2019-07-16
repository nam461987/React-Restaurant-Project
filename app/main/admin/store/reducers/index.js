import {combineReducers} from 'redux';
import accounts from './accounts.reducer';
import account from './account.reducer';
import permissions from './permissions.reducer';
import permission from './permission.reducer';
import groups from './groups.reducer';
import group from './group.reducer';
import grouppermission from './grouppermission.reducer';

const reducer = combineReducers({
    accounts,
    account,
    permissions,
    permission,
    groups,
    group,
    grouppermission
});

export default reducer;
