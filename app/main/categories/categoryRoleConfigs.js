import {FuseLoadable} from '@fuse';

export const categoryRoleConfigs = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/categories/restaurants/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./restaurant/Restaurant')
            })
        },
        {
            path     : '/categories/restaurants',
            authByStr: "category_restaurant_list",
            component: FuseLoadable({
                loader: () => import('./restaurant/Restaurants')
            })
        },
        {
            path     : '/categories/branchs/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./branch/Branch')
            })
        },
        {
            path     : '/categories/branchs',
            authByStr: "category_restaurant_branch_list",
            component: FuseLoadable({
                loader: () => import('./branch/Branchs')
            })
        },
        {
            path     : '/categories/ingredients/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./ingredient/Ingredient')
            })
        },
        {
            path     : '/categories/ingredients',
            authByStr: "category_ingredient_list",
            component: FuseLoadable({
                loader: () => import('./ingredient/Ingredients')
            })
        },
        {
            path     : '/categories/menu-categories/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./menu-category/Category')
            })
        },
        {
            path     : '/categories/menu-categories',
            authByStr: "category_menu_category_list",
            component: FuseLoadable({
                loader: () => import('./menu-category/Categories')
            })
        },
        {
            path     : '/categories/menu-units/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./menu-unit/Unit')
            })
        },
        {
            path     : '/categories/menu-units',
            authByStr: "category_menu_unit_list",
            component: FuseLoadable({
                loader: () => import('./menu-unit/Units')
            })
        },
        {
            path     : '/categories/order-channels/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./order-channel/Channel')
            })
        },
        {
            path     : '/categories/order-channels',
            authByStr: "category_order_channel_list",
            component: FuseLoadable({
                loader: () => import('./order-channel/Channels')
            })
        },
        {
            path     : '/categories/menu-sizes/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./menu-size/Size')
            })
        },
        {
            path     : '/categories/menu-sizes',
            authByStr: "category_menu_size_list",
            component: FuseLoadable({
                loader: () => import('./menu-size/Sizes')
            })
        },
        {
            path     : '/categories/menus/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./menu/Menu')
            })
        },
        {
            path     : '/categories/menus',
            authByStr: "category_menu_list",
            component: FuseLoadable({
                loader: () => import('./menu/Menus')
            })
        },
        {
            path     : '/categories/prices/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./menu/Price')
            })
        },
        {
            path     : '/categories/tables/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./table/SeatTable')
            })
        },
        {
            path     : '/categories/tables',
            authByStr: "category_restaurant_table_list",
            component: FuseLoadable({
                loader: () => import('./table/SeatTables')
            })
        },
        {
            path     : '/categories/order-processes/:id/:handle?',
            component: FuseLoadable({
                loader: () => import('./order-process/Process')
            })
        },
        {
            path     : '/categories/order-processes',
            authByStr: "order_process_list",
            component: FuseLoadable({
                loader: () => import('./order-process/Processes')
            })
        }
    ]
};
