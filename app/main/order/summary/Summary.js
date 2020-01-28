import React, { Component } from 'react';
import { Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Icon, Tab, Tabs, Tooltip, Typography } from '@material-ui/core';
import { FuseAnimate, FuseAnimateGroup, FusePageCarded } from '@fuse';
import { Link, withRouter } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import GoogleMap from 'google-map-react';
import withReducer from 'app/store/withReducer';
import SummaryStatus from './SummaryStatus';
import SummaryInvoice from './SummaryInvoice';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import obj from './configs/config';
import Filter from 'app/main/shared/functions/filters';

function Marker({ text }) {
    return (
        <Tooltip title={text} placement="top">
            <Icon className="text-red">place</Icon>
        </Tooltip>
    );
}

class Summary extends Component {

    state = {
        tabValue: 0,
        form: null,
        map: 'shipping'
    };

    async componentDidMount() {
        this.props.getProcessStatusByOrderId(this.props.match.params);
        this.props.getOrderDetailByOrderId(this.props.match.params);
        await this.props.getPlacedOrder(this.props.match.params.id);
        this.props.getBranchByOrder(this.props.placedOrder.data.BranchId);
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({ tabValue });
    };

    render() {
        const { processStatus, orderDetails, branch } = this.props;
        const placedOrder = this.props.placedOrder.data;
        const { tabValue } = this.state;

        return (
            <FusePageCarded
                classes={{
                    content: "flex",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    placedOrder && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-1 flex-col items-center sm:items-start">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to={obj.baseRoute}>
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        {obj.appName}
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex flex-col min-w-0 items-center sm:items-start">

                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {'Order ' + placedOrder.Code}
                                        </Typography>
                                    </FuseAnimate>

                                    <FuseAnimateGroup animation="transition.slideLeftIn" delay={300}>
                                        {placedOrder.CustomerId > 0 && (
                                            <Typography variant="caption">
                                                {'From ' + placedOrder.CustomerIdName}
                                            </Typography>
                                        )}
                                        {!placedOrder.CustomerId && placedOrder.CustomerName && (
                                            <Typography variant="caption">
                                                {'From ' + placedOrder.CustomerName}
                                            </Typography>
                                        )}
                                        {!placedOrder.CustomerId && !placedOrder.CustomerName && (
                                            <Typography variant="caption">
                                                From No Name
                                            </Typography>
                                        )}
                                    </FuseAnimateGroup>
                                </div>

                            </div>
                        </div>
                    )
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: "w-full h-64" }}
                    >
                        <Tab className="h-64 normal-case" label="Order Details" />
                        <Tab className="h-64 normal-case" label="Products" />
                        <Tab className="h-64 normal-case" label="Invoice" />
                    </Tabs>
                }
                content={
                    placedOrder && (
                        <div className="p-16 sm:p-24 max-w-2xl w-full">
                            {/*Order Details*/}
                            {tabValue === 0 &&
                                (
                                    <div>
                                        <div className="pb-48">

                                            <div className="pb-16 flex items-center">
                                                <Icon className="mr-16" color="action">account_circle</Icon>
                                                <Typography className="h2" color="textSecondary">Customer</Typography>
                                            </div>

                                            <div className="mb-24">

                                                <div className="table-responsive mb-16">
                                                    <table className="simple">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Phone</th>
                                                                <th>Address</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {placedOrder.CustomerId && (
                                                                <tr>
                                                                    <td>
                                                                        <div className="flex items-center">
                                                                            <Avatar className="mr-8" src="assets/images/avatars/profile.jpg" alt={placedOrder.CustomerIdName} />
                                                                            <Typography className="truncate">
                                                                                {placedOrder.CustomerIdName}
                                                                            </Typography>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <Typography className="truncate">{placedOrder.CustomerIdEmail}</Typography>
                                                                    </td>
                                                                    <td>
                                                                        <Typography className="truncate">{placedOrder.CustomerIdPhone}</Typography>
                                                                    </td>
                                                                    <td>
                                                                        <span className="truncate">{placedOrder.CustomerIdAddress}</span>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {!placedOrder.CustomerId && placedOrder.CustomerName && (
                                                                <tr>
                                                                    <td>
                                                                        <div className="flex items-center">
                                                                            <Avatar className="mr-8" src="assets/images/avatars/profile.jpg" alt={placedOrder.CustomerIdName} />
                                                                            <Typography className="truncate">
                                                                                {placedOrder.CustomerName}
                                                                            </Typography>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <Typography className="truncate">-empty-</Typography>
                                                                    </td>
                                                                    <td>
                                                                        <Typography className="truncate">{placedOrder.CustomerPhone}</Typography>
                                                                    </td>
                                                                    <td>
                                                                        <span className="truncate">{placedOrder.CustomerIdAddress}</span>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {!placedOrder.CustomerId && !placedOrder.CustomerName && (
                                                                <tr>
                                                                    <td>
                                                                        <div className="flex items-center">
                                                                            <Avatar className="mr-8" src="assets/images/avatars/profile.jpg" alt={placedOrder.CustomerIdName} />
                                                                            <Typography className="truncate">
                                                                                {placedOrder.CustomerId ? placedOrder.CustomerIdName : placedOrder.CustomerName}
                                                                            </Typography>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <Typography className="truncate">{placedOrder.CustomerId ? placedOrder.CustomerIdEmail : ''}</Typography>
                                                                    </td>
                                                                    <td>
                                                                        <Typography className="truncate">{placedOrder.CustomerId ? placedOrder.CustomerIdPhone : placedOrder.CustomerPhone}</Typography>
                                                                    </td>
                                                                    <td>
                                                                        <span className="truncate">{placedOrder.CustomerId ? placedOrder.CustomerIdAddress : placedOrder.CustomerIdAddress}</span>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <ExpansionPanel
                                                    elevation={1}
                                                    expanded={this.state.map === 'shipping'}
                                                    onChange={() => this.setState({ map: this.state.map !== 'shipping' ? 'shipping' : false })}
                                                >
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className="font-600">Shipping Address</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails className="flex flex-col md:flex-row">
                                                        <Typography className="w-full md:max-w-256 mb-16 md:mb-0">
                                                            {placedOrder.CustomerId ? placedOrder.CustomerIdAddress : placedOrder.DeliveryAddress}
                                                        </Typography>
                                                        {/* <div className="w-full h-320">
                                                            <GoogleMap
                                                                bootstrapURLKeys={{
                                                                    key: process.env.REACT_APP_MAP_KEY
                                                                }}
                                                                defaultZoom={15}
                                                                defaultCenter={[order.customer.shippingAddress.lat, order.customer.shippingAddress.lng]}
                                                            >
                                                                <Marker
                                                                    text={order.customer.shippingAddress.address}
                                                                    lat={order.customer.shippingAddress.lat}
                                                                    lng={order.customer.shippingAddress.lng}
                                                                />
                                                            </GoogleMap>
                                                        </div> */}
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </div>
                                        </div>

                                        <div className="pb-48">

                                            <div className="pb-16 flex items-center">
                                                <Icon className="mr-16" color="action">access_time</Icon>
                                                <Typography className="h2" color="textSecondary">Order Status</Typography>
                                            </div>

                                            <div className="table-responsive">
                                                <table className="simple">
                                                    <thead>
                                                        <tr>
                                                            <th>Status</th>
                                                            <th>Updated On</th>
                                                            <th>Updated By</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {processStatus.map((c, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <SummaryStatus name={c.OrderProcessIdName}
                                                                        color={c.OrderProcessIdColor} />
                                                                </td>
                                                                <td>
                                                                    {Filter.svcDateTime(c.CreatedDate, obj)}
                                                                </td>
                                                                <td>
                                                                    {c.CreatedStaffIdName}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* <div className="pb-48">

                                            <div className="pb-16 flex items-center">
                                                <Icon className="mr-16" color="action">attach_money</Icon>
                                                <Typography className="h2" color="textSecondary">Payment</Typography>
                                            </div>

                                            <div className="table-responsive">
                                                <table className="simple">
                                                    <thead>
                                                        <tr>
                                                            <th>TransactionID</th>
                                                            <th>Payment Method</th>
                                                            <th>Amount</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <span className="truncate">
                                                                    {order.payment.transactionId}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">
                                                                    {order.payment.method}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">
                                                                    {order.payment.amount}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="truncate">
                                                                    {order.payment.date}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="pb-48">

                                            <div className="pb-16 flex items-center">
                                                <Icon className="mr-16" color="action">local_shipping</Icon>
                                                <Typography className="h2" color="textSecondary">Shipping</Typography>
                                            </div>

                                            <div className="table-responsive">
                                                <table className="simple">
                                                    <thead>
                                                        <tr>
                                                            <th>Tracking Code</th>
                                                            <th>Carrier</th>
                                                            <th>Weight</th>
                                                            <th>Fee</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.shippingDetails.map(shipping => (
                                                            <tr key={shipping.date}>
                                                                <td>
                                                                    <span className="truncate">
                                                                        {shipping.tracking}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="truncate">
                                                                        {shipping.carrier}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="truncate">
                                                                        {shipping.weight}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="truncate">
                                                                        {shipping.fee}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="truncate">
                                                                        {shipping.date}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> */}
                                    </div>
                                )}
                            {/*Products*/}
                            {tabValue === 1 &&
                                (
                                    <div className="table-responsive">
                                        <table className="simple">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>IsFinish</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDetails.map((c, index) => (
                                                    <tr key={index}>
                                                        <td className="w-64">
                                                            {index + 1}
                                                        </td>
                                                        <td className="w-80">
                                                            <img className="c-image" src={c.MenuIdImage} alt={c.MenuIdName} />
                                                        </td>
                                                        <td>
                                                            <Typography
                                                                className="truncate"
                                                                style={{
                                                                    color: 'inherit'
                                                                }}
                                                            >
                                                                {c.MenuIdName} ({c.SizeIdName})
                                                            </Typography>
                                                        </td>
                                                        <td>
                                                            <span className="truncate">
                                                                {c.Quantity}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="truncate">
                                                                {Filter.svcMoney(c.MenuPrice)}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="truncate">
                                                                {Filter.svcActive(c.IsFinish)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            {/*Invoice*/}
                            {tabValue === 2 &&
                                (
                                    <SummaryInvoice order={placedOrder} orderDetails={orderDetails}
                                        branch={branch} />
                                )}
                        </div>
                    )
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getProcessStatusByOrderId: Actions.getProcessStatusByOrderId,
        getOrderDetailByOrderId: Actions.getOrderDetailByOrderId,
        getBranchByOrder: Actions.getBranchByOrder,
        getPlacedOrder: Actions.getPlacedOrder
    }, dispatch);
}

function mapStateToProps({ order }) {
    return {
        processStatus: order.summary.processStatus,
        orderDetails: order.summary.orderDetails,
        placedOrder: order.placedOrder,
        branch: order.summary.branch
    }
}

export default withReducer('order', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Summary)));
