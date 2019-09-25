import React from 'react';
import classNames from 'classnames';
import _ from '@lodash';

const OrdersStatus = ({ name, color }) => {
    return (
        <div className={classNames("inline text-12 p-4 rounded truncate", color)}>
            {name}
        </div>
    );
};

export default OrdersStatus;
