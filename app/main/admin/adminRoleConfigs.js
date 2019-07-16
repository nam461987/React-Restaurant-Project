import { FuseLoadable } from '@fuse';

export const adminRoleConfigs = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/admin/accounts/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./account/Account')
            })
        },
        {
            path: '/admin/accounts',
            authByStr: "admin_user_list",
            component: FuseLoadable({
                loader: () => import('./account/Accounts')
            })
        },
        {
            path: '/admin/permissions/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./permission/Permission')
            })
        },
        {
            path: '/admin/permissions',
            authByStr: "admin_permission_list",
            component: FuseLoadable({
                loader: () => import('./permission/Permissions')
            })
        },
        {
            path: '/admin/groups/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./group/Group')
            })
        },
        {
            path: '/admin/groups',
            authByStr: "admin_group_list",
            component: FuseLoadable({
                loader: () => import('./group/Groups')
            })
        },
        {
            path: '/admin/grouppermission',
            authByStr: "admin_group_permission_list",
            component: FuseLoadable({
                loader: () => import('./group-permission/GroupPermission.js')
            })
        }
    ]
};
