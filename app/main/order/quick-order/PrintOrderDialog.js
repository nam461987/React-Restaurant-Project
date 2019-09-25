import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table,
    Card,
    CardContent,
    withStyles
} from '@material-ui/core';
import classNames from 'classnames';
import obj from '../summary/configs/config';
import Filter from 'app/main/shared/functions/filters';
import ReactToPrint from 'react-to-print';

const styles = theme => ({
    root: {
        '& table ': {
            '& th:first-child, & td:first-child': {
                paddingLeft: 0 + '!important'
            },
            '& th:last-child, & td:last-child': {
                paddingRight: 0 + '!important'
            }
        }
    },
    divider: {
        width: 1,
        backgroundColor: theme.palette.divider,
        height: 144
    },
    seller: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        marginRight: -88,
        paddingRight: 66,
        width: 480,
        '& .divider': {
            backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
            opacity: .5
        }
    }
});

class PrintOrderDialog extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        open: this.props.open
    };

    handlePrint = () => {
        window.print();
        this.props.printAction();
    }

    Content = () => {
        const { order, orders, classes } = this.props;
        console.log(this.props);
        return (
            <div className={classNames(classes.root, "flex-grow flex-no-shrink p-0")}>

                {order && (
                    <Card className="mx-auto" elevation={0}>

                        <CardContent className="print:p-0">

                            <Typography color="textSecondary" className="mb-32">
                                {Filter.svcDateTime(order.CreatedDate, obj)}
                            </Typography>

                            <div className="flex justify-between">

                                <div>
                                    <table className="mb-16">
                                        <tbody>
                                            <tr>
                                                <td colSpan="2" className="pr-16 pb-4">
                                                    <Typography className="font-light" variant="h6" color="textSecondary">
                                                        {order.OrderTypeIdName}
                                                    </Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pr-16 pb-4">
                                                    <Typography className="font-light" variant="h6" color="textSecondary">
                                                        Order
                                                </Typography>
                                                </td>
                                                <td className="pb-4">
                                                    <Typography className="font-light" variant="h6" color="inherit">
                                                        {order.Code.slice(-5)}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <Typography color="textSecondary">
                                        {order.CustomerId ? order.CustomerIdName : order.CustomerName}
                                    </Typography>

                                    {order.CustomerId || order.DeliveryAddress && (
                                        <Typography color="textSecondary">
                                            {order.CustomerId ? order.CustomerIdAddress : order.DeliveryAddress}
                                        </Typography>
                                    )}
                                    {order.CustomerId || order.CustomerPhone && (
                                        <Typography color="textSecondary">
                                            {order.CustomerId ? order.CustomerIdPhone : order.CustomerPhone}
                                        </Typography>
                                    )}
                                    {order.CustomerId && (
                                        <Typography color="textSecondary">
                                            {order.CustomerId ? order.CustomerIdEmail : ""}
                                        </Typography>
                                    )}
                                </div>
                            </div>

                            <div className="mt-64">

                                <Table className="simple">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                ORDER DETAIL
                                        </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.orders.map((c, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Typography variant="subtitle1">
                                                        <span className="font-bold">{c.Quantity} X </span>{c.MenuIdName} ({c.SizeIdName})</Typography>
                                                    {c.Description.length > 0 ?
                                                        <div dangerouslySetInnerHTML={{ __html: c.Description.replace(/\r?\n/g, '<br />') }} />
                                                        : null}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        )
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Do you want to print the order?"}</DialogTitle>
                    <DialogContent ref={el => (this.componentRef = el)}>
                        {this.Content()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.printAction} color="primary">
                            Skip
                        </Button>
                        <ReactToPrint
                            trigger={() => <Button onClick={event => this.handlePrint()} color="primary" autoFocus>
                                Print
                        </Button>}
                            content={() => this.componentRef}
                        />

                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default (withStyles(styles, { withTheme: true })(withRouter(connect(null, null)(PrintOrderDialog))));
