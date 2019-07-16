import {FuseLoadable} from '@fuse';

export const DenyPageConfig = {
    routes  : [
        {
            path     : '/errors/error-deny',
            component: FuseLoadable({
                loader: () => import('./DenyPage')
            })
        }
    ]
};
