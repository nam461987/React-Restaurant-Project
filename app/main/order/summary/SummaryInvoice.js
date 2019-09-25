import React from 'react';
import { withStyles, Card, CardContent, Typography, TableCell, TableRow, TableBody, TableHead, Table } from '@material-ui/core';
import classNames from 'classnames';
import obj from './configs/config';
import Filter from 'app/main/shared/functions/filters';

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

const OrderInvoice = ({ classes, order, orderDetails, branch }) => {

    const formatter = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

    return (
        <div className={classNames(classes.root, "flex-grow flex-no-shrink p-0")}>

            {order && (
                <Card className="w-xl mx-auto" elevation={0}>

                    <CardContent className="p-88 print:p-0">

                        <Typography color="textSecondary" className="mb-32">
                            {Filter.svcDateTime(order.CreatedDate, obj)}
                        </Typography>

                        <div className="flex justify-between">

                            <div>
                                <table className="mb-16">
                                    <tbody>
                                        <tr>
                                            <td className="pr-16 pb-4">
                                                <Typography className="font-light" variant="h6" color="textSecondary">
                                                    INVOICE
                                                </Typography>
                                            </td>
                                            <td className="pb-4">
                                                <Typography className="font-light" variant="h6" color="inherit">
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

                            <div className={classNames(classes.seller, "flex items-center p-16")}>

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
                        </div>

                        <div className="mt-64">

                            <Table className="simple">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            PRODUCT
                                        </TableCell>
                                        <TableCell align="right">
                                            PRICE
                                        </TableCell>
                                        <TableCell align="right">
                                            QUANTITY
                                        </TableCell>
                                        <TableCell align="right">
                                            TOTAL
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetails.map((c, index) => (
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
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">SUBTOTAL</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                {formatter.format(order.Price ? order.Price : 0)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">TAX</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                {formatter.format(order.Tax ? order.Tax : 0)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">DISCOUNT</Typography>
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
                                            <Typography className="font-light" variant="h4" color="textSecondary">TOTAL</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-light" variant="h4" color="textSecondary">
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
    );
};

export default withStyles(styles, { withTheme: true })(OrderInvoice);
