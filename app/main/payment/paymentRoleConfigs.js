
import {FuseLoadable} from '@fuse';

export const paymentRoleConfigs = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: true
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: true
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/payment/order/:id',
            authByStr: "checkout_page",
            component: FuseLoadable({
                loader: () => import('./checkout/Checkout')
            })
        }
    ]
};
