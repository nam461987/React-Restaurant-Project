
import {FuseLoadable} from '@fuse';

export const placedOrderRoleConfigs = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/order/placed-orders/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./order/PlacedOrder')
            })
        },
        {
            path     : '/order/placed-orders',
            authByStr: "placed_order_list",
            component: FuseLoadable({
                loader: () => import('./order/PlacedOrders')
            })
        }
    ]
};
