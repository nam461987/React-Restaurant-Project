import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import cloneDeep from 'lodash/cloneDeep';
import { withStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Icon,
    IconButton
} from '@material-ui/core';
import { showMessage } from 'app/store/actions/fuse';
import Filter from 'app/main/shared/functions/filters';
import * as Actions from '../store/actions';

const TAX_RATE = 0.07;

const styles = () => ({
    root: {
        width: '100%',
        padding: 16,
        overflowX: 'auto',
    }
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ Price }) => Price).reduce((sum, i) => sum + i, 0);
}

class RightSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
            invoiceSubtotal: 0,
            invoiceTaxes: 0,
            invoiceTotal: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const oldValue = cloneDeep(this.props.orders);
        if (!_.isEqual(this.props.orders, this.state.orders)) {
            this.setState({ orders: oldValue })
            this.sumFunction();
        }
    }

    handleDeleteOrder = (i) => {
        if (i > -1) {
            let result = window.confirm("You really want to delete?");
            if (result) {
                this.props.deleteAddMoreOrder(i);
                this.props.refresh();
            }
        }
    }

    handleRowClick = (index,obj) => {
        this.props.setEditAddMoreOrder(index,obj);
    }

    sumFunction = () => {
        const rows = this.props.orders;

        const invoiceSubtotal = subtotal(rows);
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;

        this.setState({
            invoiceSubtotal: invoiceSubtotal,
            invoiceTaxes: invoiceTaxes,
            invoiceTotal: invoiceTotal
        });
    }

    render() {
        const { classes } = this.props;
        const { invoiceSubtotal, invoiceTaxes, invoiceTotal } = this.state;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '10%' }}></TableCell>
                            <TableCell colSpan={2}>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.orders.length > 0 ? this.props.orders.map((item, index) =>
                            (
                                <TableRow hover key={index} onClick={event => this.handleRowClick(index,item)}>
                                    <TableCell align="left" style={{ width: '10%' }}
                                        onClick={event => event.stopPropagation()}>
                                        <IconButton onClick={event => this.handleDeleteOrder(index)} color="secondary" aria-label="delete this order">
                                            <Icon fontSize="small" className="text-red">clear</Icon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <Typography variant="subtitle1">{item.MenuIdName} <span className="font-bold text-blue">x {item.Quantity}</span></Typography>
                                        {item.SizeIdName}
                                        {item.Description.length > 0 ?
                                            <div dangerouslySetInnerHTML={{ __html: item.Description.replace(/\r?\n/g, '<br />') }} />
                                            : ''}
                                    </TableCell>
                                    <TableCell align="right" className="font-bold">
                                        {Filter.svcMoney(item.Price)}
                                    </TableCell>
                                </TableRow>
                            )
                        )
                            : <TableRow><TableCell colSpan={4} align="center" className="font-bold">
                                <Typography variant="subtitle1">No item data</Typography>
                            </TableCell></TableRow>
                        }
                        {this.props.orders.length > 0 ?
                            <React.Fragment>
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Tax ({`${(TAX_RATE * 100).toFixed(0)} %`})</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                                </TableRow>
                            </React.Fragment> : null}

                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        deleteAddMoreOrder: Actions.deleteAddMoreOrder,
        setEditAddMoreOrder: Actions.setEditAddMoreOrder
    }, dispatch);
}

function mapStateToProps({ auth, order }) {
    return {
        user: auth.user,
        orders: order.addMoreOrders.addMoreOrders
    }
}

export default (withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(RightSide))));