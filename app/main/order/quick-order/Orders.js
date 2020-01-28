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
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Modal from './Modal';
import PrintOrderDialog from './PrintOrderDialog';
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
        width: '85%',
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
        orders: this.props.orders,
        printOrderModalOpen: false,
        cloneOrder: null
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
        this.setState({
            cloneOrder: Object.assign({}, this.props.order)
        })
        await this.props.addOrder(this.props.order);
        const { order, orders } = this.props;
        if (order.Id && order.Id > 0) {
            for (let i = 0; i < orders.length; i++) {
                orders[i].PlacedOrderId = order.Id;
                await this.props.addOrderDetail(orders[i]);
            }
            this.setState({
                printOrderModalOpen: true,
                cloneOrder: Object.assign(this.props.order, this.state.cloneOrder)
            });
        }
        else {
            this.props.showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR });
        }
        this.bothSideUpdated();
    }

    checkoutClick = async (item, route) => {
        this.setState({
            cloneOrder: Object.assign({}, this.props.order)
        })
        await this.props.addOrder(this.props.order);
        const { order, orders } = this.props;
        if (order.Id && order.Id > 0) {
            for (let i = 0; i < orders.length; i++) {
                orders[i].PlacedOrderId = order.Id;
                await this.props.addOrderDetail(orders[i]);
            }
            this.props.history.push('/payment/order/' + order.Id);
        }
        else {
            this.props.showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR });
        }
        this.bothSideUpdated();
    };

    handlePrintOrder = () => {
        this.props.setDefaultOrderValue();
        this.props.setDefaultOrdersValue();
        this.setState({ printOrderModalOpen: false })
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
                        header: "h-100 min-h-100 flex flex-wrap content-center flex-row",
                        sidebarHeader: "h-100 min-h-100 flex flex-wrap content-center flex-row"
                    }}
                    header={
                        <React.Fragment>

                            <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                                <Hidden lgUp>
                                    <div className="flex items-center justify-end">
                                        <FuseAnimate animation="transition.expandIn" delay={200}>
                                            <IconButton onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                                aria-label="open right sidebar">
                                                <Icon>menu</Icon>
                                            </IconButton>
                                        </FuseAnimate>
                                    </div>
                                </Hidden>
                                <div className="flex items-center justify-start">
                                    <Typography className='pl-36 pb-12 text-16 sm:text-24'>
                                        <span>
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
                                    className="mr-8"
                                    disabled={!this.canBeSent()}
                                    onClick={event => this.handleSendOrder()}
                                >
                                    <NavigationIcon className={classes.extendedIcon} />
                                    Send Order
                            </Fab>
                                <Fab
                                    variant="extended"
                                    size="medium"
                                    aria-label="Add"
                                    className="bg-green text-white"
                                    disabled={!this.canBeSent()}
                                    onClick={event => this.checkoutClick()}
                                >
                                    <Icon className={classes.extendedIcon}>payment</Icon>
                                    Checkout
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
                {this.state.printOrderModalOpen ? <PrintOrderDialog open={this.state.printOrderModalOpen} printAction={this.handlePrintOrder}
                    order={{ ...this.state.cloneOrder }} orders={{ orders }} /> : null}
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
