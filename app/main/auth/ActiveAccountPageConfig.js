import {FuseLoadable} from '@fuse';

export const ActiveAccountPageConfig = {
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
            path     : '/account-active/:token?',
            component: FuseLoadable({
                loader: () => import('./ActiveAccountPage')
            })
        }
    ]
};
