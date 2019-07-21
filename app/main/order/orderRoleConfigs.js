
import {FuseLoadable} from '@fuse';

export const orderRoleConfigs = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/orders/:id?',
            component: FuseLoadable({
                loader: () => import('./Orders')
            })
        }
    ]
};
