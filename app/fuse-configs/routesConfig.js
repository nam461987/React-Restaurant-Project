import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {authRoleConfigs} from 'app/main/auth/authRoleConfigs';
import {errorRoleConfigs} from 'app/main/errors/errorRoleConfigs';
import {appRoleConfigs} from 'app/main/apps/appRoleConfigs';
import {adminRoleConfigs} from 'app/main/admin/adminRoleConfigs';
import {categoryRoleConfigs} from 'app/main/categories/categoryRoleConfigs';
import {orderRoleConfigs} from 'app/main/order/orderRoleConfigs';
import {placedOrderRoleConfigs} from 'app/main/order/placedOrderRoleConfigs';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';

const routeConfigs = [
    ...authRoleConfigs,
    ...errorRoleConfigs,
    ...appRoleConfigs,
    adminRoleConfigs,
    categoryRoleConfigs,
    orderRoleConfigs,
    placedOrderRoleConfigs,
    ExampleConfig,
    LoginConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/dashboard"/>
    },
    {
        component: () => <Redirect to="/errors/error-404"/>
    }
];

 export default routes;
