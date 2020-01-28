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

class AddMoreOrderDetail extends Component {
    state = {
        orders: this.props.orders
    };

    componentDidMount() {
        this.props.setDefaultAddMoreOrdersValue();
    };

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.orders, prevProps.orders)) {
            this.setState({ orders: this.props.orders })
        }
    }

    bothSideUpdated = () => {
        this.setState({ orders: this.props.orders })
    }

    handleSendOrder = async () => {
        const { orders } = this.props;

        const params = this.props.match.params;
        const { id } = params;

        if (id > 0) {
            for (let i = 0; i < orders.length; i++) {
                orders[i].PlacedOrderId = id;
                await this.props.addOrderDetail(orders[i]);
            }
            this.props.setOrderMoreOrderProcess(id);
            this.props.setDefaultAddMoreOrdersValue();
        }
        else {
            this.props.showMessage({ message: Constants.MODAL.ADD_DATA_FAIL, variant: Constants.VARIANT.ERROR });
        }
        this.bothSideUpdated();
    }

    checkoutClick = (item, route) => {
        // this.props.history.push(route + item.Id + '/' + slugify(item[this.props.obj.urlName], { replacement: '-', remove: null, lower: true }));
        this.props.history.push('/payment/order/' + item.Id);
    };

    canBeSent = () => {
        return this.props.orders.length > 0;
    }

    render() {
        const { classes } = this.props;
        const { orders } = this.state;
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
                                    <div className="flex items-center justify-between">
                                        <FuseAnimate animation="transition.expandIn" delay={200}>
                                            <IconButton onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                                aria-label="open right sidebar">
                                                <Icon>menu</Icon>
                                            </IconButton>
                                        </FuseAnimate>
                                    </div>
                                </Hidden>
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
                                    Add Order
                            </Fab>
                            <Fab
                                    variant="extended"
                                    size="medium"
                                    aria-label="Add"
                                    className="bg-green text-white"
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
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        addOrderDetail: Actions.addOrderDetail,
        setDefaultAddMoreOrdersValue: Actions.setDefaultAddMoreOrdersValue,
        setOrderMoreOrderProcess:Actions.setOrderMoreOrderProcess
    }, dispatch);
}

function mapStateToProps({ order }) {
    return {
        orders: order.addMoreOrders.addMoreOrders
    }
}

export default (withReducer('order', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMoreOrderDetail)))));
