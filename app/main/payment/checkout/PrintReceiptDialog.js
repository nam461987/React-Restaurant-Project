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
        width: '100%',
        '& .divider': {
            backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
            opacity: .5
        }
    }
});

const formatter = new Intl.NumberFormat('en-US',
    {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

const obj = {
    defaultConfig: {
        datePickerFormat: "dd/mm/yyyy",
        dateFormat: "DD/MM/YYYY",
        dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
        isoDateTimeFormat: "YYYY-MM-DDTHH:mm:ss.000",
        timeFormat: "HH:mm"
    }
};

class PrintReceiptDialog extends Component {

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

    printTime = () => {
        return new Date().toLocaleString();
    }

    Content = () => {
        const { order, orders, classes, branch } = this.props;
        return (
            <div className={classNames(classes.root, "flex-grow flex-no-shrink p-0")}>

                {order && (
                    <Card className="mx-auto" elevation={0}>

                        <CardContent className="print:p-0">

                            <div className={classNames(classes.seller, "flex items-center p-16 mb-32")}>

                                <img className="w-80" src="assets/images/logos/fuse.svg" alt="logo" />

                                <div className={classNames(classes.divider, "divider ml-8 mr-16 h-96")} />

                                <div>
                                    <Typography color="inherit">{branch.RestaurantIdName}</Typography>

                                    <Typography color="inherit">
                                        {branch.Address ?
                                            branch.Address + ", " + branch.CityIdName + ", " + branch.StateIdName + " " + branch.Zip
                                            : "Your Branch Address will be here"}
                                    </Typography>
                                    <Typography color="inherit">
                                        {branch.Phone ?
                                            branch.Phone
                                            : "Your branch phone will be here"}
                                    </Typography>
                                    <Typography color="inherit">
                                        {branch.Email ?
                                            branch.Email
                                            : "Your restaurant email will be here"}
                                    </Typography>
                                    <Typography color="inherit">
                                        {branch.Website ?
                                            branch.Website
                                            : "Your restaurant website will be here"}
                                    </Typography>
                                </div>
                            </div>

                            <Typography color="textSecondary" className="mb-16">
                                {/* {Filter.svcDateTime(order.CreatedDate, obj)} */}
                                {this.printTime()}
                            </Typography>

                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="pr-16 pb-4">
                                                <Typography className="font-light" variant="subtitle1" color="textSecondary">
                                                    INVOICE
                                                </Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography className="font-light" variant="subtitle1" color="inherit">
                                                    {order.Code}
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

                            <div className="mt-64">

                                <Table className="simple">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Product
                                        </TableCell>
                                            <TableCell align="right">
                                                Price
                                        </TableCell>
                                            <TableCell align="right">
                                                Quantity
                                        </TableCell>
                                            <TableCell align="right">
                                                Total
                                        </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map((c, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Typography variant="subtitle1">{c.MenuIdName} ({c.SizeIdName})</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {formatter.format(c.MenuPrice)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {c.Quantity}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {formatter.format(c.MenuPrice * c.Quantity)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <Table className="simple mt-32">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Typography className="font-medium" variant="subtitle1" color="textSecondary">Subtotal</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                    {formatter.format(order.Price ? order.Price : 0)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Typography className="font-medium" variant="subtitle1" color="textSecondary">Tax</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                    {formatter.format(order.Tax ? order.Tax : 0)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Typography className="font-medium" variant="subtitle1" color="textSecondary">Discount</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                    {order.DiscountType == 1 ? order.Discount ? order.Discount + " %" : 0
                                                        : formatter.format(order.Discount ? order.Discount : 0)
                                                    }
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Typography className="font-light" variant="h5" color="textSecondary">Total</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography className="font-light" variant="h5" color="textSecondary">
                                                    {formatter.format(order.FinalPrice ? order.FinalPrice : order.Price)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
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
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Do you want to print the receipt?"}</DialogTitle>
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

export default (withStyles(styles, { withTheme: true })(withRouter(connect(null, null)(PrintReceiptDialog))));
