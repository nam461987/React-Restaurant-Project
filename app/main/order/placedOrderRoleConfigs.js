
import { FuseLoadable } from '@fuse';

export const placedOrderRoleConfigs = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/order/placed-orders/:id/:handle?',
            exact: true,
            component: FuseLoadable({
                loader: () => import('./order/PlacedOrder')
            })
        },
        {
            path: '/order/placed-orders',
            authByStr: "placed_order_list",
            component: FuseLoadable({
                loader: () => import('./order/PlacedOrders')
            })
        },
        {
            path: '/placed-orders/summary/:id',
            authByStr: "placed_order_list",
            component: FuseLoadable({
                loader: () => import('./summary/Summary')
            })
        },
        {
            path: '/placed-orders/details/:id',
            authByStr: "placed_order_detail_list",
            component: FuseLoadable({
                loader: () => import('./order-detail/PlacedOrderDetails')
            })
        }
    ]
};
