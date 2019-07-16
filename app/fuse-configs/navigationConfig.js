const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'dashboard-component',
                'title': 'Dashboard',
                'type' : 'item',
                'icon' : 'home',
                'url'  : '/dashboard'
            }
        ]
    },
    {
        
        'id'      : 'datas',
        'title'   : 'Datas',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'categories-component',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'whatshot',
                'children': [
                    {
                        'id'   : 'restaurant-component',
                        'title': 'Restaurant',
                        'type' : 'item',
                        'authByStr' : 'category_restaurant_list',
                        'url'  : '/categories/restaurants'
                    },
                    {
                        'id'   : 'branch-component',
                        'title': 'Branch',
                        'type' : 'item',
                        'authByStr' : 'category_restaurant_branch_list',
                        'url'  : '/categories/branchs'
                    },
                    {
                        'id'   : 'ingredient-component',
                        'title': 'Ingredient',
                        'type' : 'item',
                        'authByStr' : 'category_ingredient_list',
                        'url'  : '/categories/ingredients'
                    },
                    {
                        'id'   : 'menu-category-component',
                        'title': 'Menu Category',
                        'type' : 'item',
                        'authByStr' : 'category_menu_category_list',
                        'url'  : '/categories/menu-categories'
                    },
                    {
                        'id'   : 'menu-unit-component',
                        'title': 'Menu Unit',
                        'type' : 'item',
                        'authByStr' : 'category_menu_unit_list',
                        'url'  : '/categories/menu-units'
                    },
                    {
                        'id'   : 'order-channel-component',
                        'title': 'Order Channel',
                        'type' : 'item',
                        'authByStr' : 'category_order_channel_list',
                        'url'  : '/categories/order-channels'
                    },
                    {
                        'id'   : 'menu-size-component',
                        'title': 'Menu Size',
                        'type' : 'item',
                        'authByStr' : 'category_menu_size_list',
                        'url'  : '/categories/menu-sizes'
                    },
                    {
                        'id'   : 'menu-component',
                        'title': 'Menu',
                        'type' : 'item',
                        'authByStr' : 'category_menu_list',
                        'url'  : '/categories/menus'
                    }
                ]
            }
        ]
    },
    // {
        
    //     'id'      : 'authentications',
    //     'title'   : 'Authentications',
    //     'type'    : 'group',
    //     'icon'    : 'apps',
    //     'children': [
    //         {
    //             'id'   : 'user-action-component',
    //             'title': 'User Action',
    //             'type' : 'collapse',
    //             'icon' : 'whatshot',
    //             'children': [
    //                 {
    //                     'id'   : 'login-component',
    //                     'title': 'Login',
    //                     'type' : 'item',
    //                     'url'  : '/login'
    //                 },
    //                 {
    //                     'id'   : 'forgot-password-component',
    //                     'title': 'Forgot Password',
    //                     'type' : 'item',
    //                     'url'  : '/forgot-password'
    //                 },
    //                 {
    //                     'id'   : 'mail-confirm-component',
    //                     'title': 'Mail Confirm',
    //                     'type' : 'item',
    //                     'url'  : '/mail-confirm'
    //                 },
    //                 {
    //                     'id'   : 'reset-password-component',
    //                     'title': 'Reset Password',
    //                     'type' : 'item',
    //                     'url'  : '/reset-password'
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        'id'      : 'admin',
        'title'   : 'Admin',
        'type'    : 'group',
        'authByStr' : 'admin_see',
        'children': [
            {
                'id'   : 'admin-component',
                'title': 'Admin',
                'type' : 'collapse',
                'icon' : 'person_outline',
                'children': [
                    {
                        'id'   : 'admin_account',
                        'title': 'Account',
                        'type' : 'item',
                        'authByStr' : 'admin_user_list',
                        'url'  : '/admin/accounts'
                    },
                    {
                        'id'   : 'admin_group',
                        'title': 'Group',
                        'type' : 'item',
                        'authByStr' : 'admin_group_list',
                        'url'  : '/admin/groups'
                    },
                    {
                        'id'   : 'admin_permission',
                        'title': 'Permission',
                        'type' : 'item',
                        'authByStr' : 'admin_permission_list',
                        'url'  : '/admin/permissions'
                    },
                    {
                        'id'   : 'setpermission_account',
                        'title': 'Set Group Permission',
                        'type' : 'item',
                        'authByStr' : 'admin_group_permission_list',
                        'url'  : '/admin/grouppermission'
                    }
                ]
            }
        ]
    }
];

export default navigationConfig;
