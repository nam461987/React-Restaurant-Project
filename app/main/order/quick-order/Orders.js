import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import {
    withStyles,
    IconButton,
    Icon,
    Hidden,
    Fab,
    Typography
} from '@material-ui/core';
import _ from '@lodash';
import { FusePageSimple, FuseAnimate } from '@fuse';
import withReducer from 'app/store/withReducer';
import NavigationIcon from '@material-ui/icons/Navigation';
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import Modal from './Modal'
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import { showMessage } from 'app/store/actions/fuse';
import Constants from 'app/shared/constants/constants';

const styles = theme => ({
    layoutRoot: {},
    sidebar: {
        position: 'absolute',
        '&.permanent': {
            [theme.breakpoints.up('lg')]: {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                position: 'relative'
            }
        },
        width: '70%',
        height: '100%'
    },
    margin: {
        margin: 8,
    },
    extendedIcon: {
        marginRight: 8,
    }
});

class SimpleFullWidthSample extends Component {
    state = {
        orders: this.props.orders
    };

    componentDidMount() {
        this.props.setDefaultOrderValue();
        this.props.setDefaultOrdersValue();
    };

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.orders, prevProps.orders)) {
            this.setState({ orders: this.props.orders })
        }
        if (!_.isEqual(this.props.order, prevProps.order)) {
            this.setState({ order: this.props.order })
        }
    }

    bothSideUpdated = () => {
        this.setState({ orders: this.props.orders })
    }

    handleSendOrder = async () => {
        const { order, orders } = this.props;
        await this.props.addOrder(order);

        if (order.Id && order.Id > 0) {
            console.log(orders);
            for (let i = 0; i < orders.length; i++) {
                console.log(orders[i]);
                orders[i].PlacedOrderId = order.Id;
                await this.props.addOrderDetail(orders[i]);
            }
            this.props.setDefaultOrderValue();
        this.props.setDefaultOrdersValue();
        }
        else {
            this.props.showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR });
        }
        this.bothSideUpdated();
    }

    canBeSent = () => {
        return this.props.orders.length > 0;
    }

    render() {
        const { classes } = this.props;
        const { orders, order } = this.state;
        return (
            <div>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot,
                        rightSidebar: "md:w-640 xl:w-640",
                        staticWidth: classes.sidebar,
                        header: "h-100 min-h-100",
                        sidebarHeader: "h-100 min-h-100"
                    }}
                    header={
                        <React.Fragment>

                            <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                                <Hidden lgUp>
                                    <div className="flex items-center justify-between">
                                        <FuseAnimate animation="transition.expandIn" delay={200}>
                                            <IconButton onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                                aria-label="open right sidebar">
                                                <Icon>menu</Icon>
                                            </IconButton>
                                        </FuseAnimate>
                                    </div>
                                </Hidden>
                                <div className="flex flex-1 items-end">
                                    <Typography className='flex flex-1 pl-36 pb-12 text-16 sm:text-24'>
                                        <span className="flex items-center">
                                            {order && (order.OrderTypeId == 1 ?
                                                <React.Fragment>
                                                    <span>{order.OrderTypeIdName}</span>
                                                    <Icon>chevron_right</Icon>
                                                    <span>{order.PeopleNum} people</span>
                                                    <Icon>chevron_right</Icon>
                                                    <span>{order.TableIdName}</span>
                                                </React.Fragment>
                                                : order.OrderTypeId == 2 ?
                                                    <React.Fragment>
                                                        <span>{order.OrderTypeIdName}</span>
                                                        <Icon>chevron_right</Icon>
                                                        <span>Customer: {order.CustomerName}</span>
                                                    </React.Fragment> : order.OrderTypeId == 3 ?
                                                        <React.Fragment>
                                                            <span>{order.OrderTypeIdName}</span>
                                                            <Icon>chevron_right</Icon>
                                                            <span>Channel: {order.OrderChannelIdName}</span>
                                                        </React.Fragment> : '')}
                                        </span>
                                    </Typography>
                                </div>
                            </div>


                        </React.Fragment>
                    }
                    content={
                        <LeftSide refresh={this.bothSideUpdated} />
                    }
                    rightSidebarHeader={
                        <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                            <div className="flex items-center justify-end">
                                <Fab
                                    variant="extended"
                                    size="medium"
                                    color="secondary"
                                    aria-label="Add"
                                    disabled={!this.canBeSent()}
                                    onClick={event => this.handleSendOrder()}
                                >
                                    <NavigationIcon className={classes.extendedIcon} />
                                    Send Order
                            </Fab>
                            </div>
                        </div>
                    }
                    rightSidebarContent={
                        <RightSide data={{ orders }} refresh={this.bothSideUpdated} />
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <Modal />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        addOrder: Actions.addOrder,
        newOrder: Actions.newOrder,
        addOrderDetail: Actions.addOrderDetail,
        setDefaultOrderValue: Actions.setDefaultOrderValue,
        setDefaultOrdersValue: Actions.setDefaultOrdersValue
    }, dispatch);
}

function mapStateToProps({ order }) {
    return {
        orders: order.orders.orders,
        order: order.order.order
    }
}

export default (withReducer('order', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(SimpleFullWidthSample)))));
