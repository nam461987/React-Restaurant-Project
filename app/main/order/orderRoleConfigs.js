
import {FuseLoadable} from '@fuse';

export const orderRoleConfigs = {
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
            authByStr: "quick_order_page",
            component: FuseLoadable({
                loader: () => import('./quick-order/Orders')
            })
        },
        {
            path     : '/order/waiting-orders',
            authByStr: "waiting_order_list",
            component: FuseLoadable({
                loader: () => import('./waiting-list/WaitingOrders')
            })
        },
        {
            path     : '/order/add-more-orders/:id/:handle?',
            authByStr: "placed_order_detail_create",
            component: FuseLoadable({
                loader: () => import('./add-more-order-detail/Orders')
            })
        }
    ]
};
