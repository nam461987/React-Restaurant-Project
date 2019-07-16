import {FuseLoadable} from '@fuse';

export const ForgotPassword2PageConfig = {
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
            path     : '/forgot-password',
            component: FuseLoadable({
                loader: () => import('./ForgotPassword2Page')
            })
        }
    ]
};
