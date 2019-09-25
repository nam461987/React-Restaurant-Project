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
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core';
import { FuseScrollbars, FuseChipSelect } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';
import Filter from 'app/main/shared/functions/filters';
import * as Actions from '../../order/store/actions';

const TAX_RATE = 0.07;

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

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: 24,
        overflowX: 'auto',
    },
    table: {
        maxWidth: '100%'
    },
    button: {
        margin: 8,
    }
})

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const discountTypeOptions = [
    { value: 1, label: "Percent" },
    { value: 2, label: "Money" }
];

const formatter = new Intl.NumberFormat('en-US',
    {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

class RightSide extends Component {

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    state = {
        discountOpen: false,
        taxOpen: false,
        noteOpen: false,
        VirDiscount: 0,
        Discount: 0,
        VirDiscountType: 2,
        DiscountType: 2,
        VirDescription: '',
        Description: '',
        VirTax: 0,
        Tax: 0,
        VirTaxPercent: 0,
        TaxPercent: 0,
        Price: 0,
        FinalPrice: 0,
        PlacedOrderDetails: this.props.placedOrderDetails
    }

    componentDidMount() {
        this.props.getPlacedOrder(this.props.match.params.id);
        this.props.getOrderDetailByOrderId(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        const { VirDiscountType, VirDiscount, VirTax } = this.state;
        if (!_.isEqual(this.props.placedOrderDetails, prevProps.placedOrderDetails)) {
            this.setState({
                PlacedOrderDetails: this.props.placedOrderDetails
            });
        }
        if (!_.isEqual(this.props.placedOrder.data, prevProps.placedOrder.data)) {
            const { Price } = this.props.placedOrder.data;
            this.setState({
                Price: Price
            });
        }
        if(!_.isEqual(this.state.Price, prevState.Price)){
            this.calculateFinalPrice();
        }
    }

    handleChange = (event) => {
        const { Price, VirDiscountType } = this.state;
        if (event.target.name == "VirDiscount") {
            this.setState({
                VirDiscount: parseFloat(event.target.value)
            });
        }
        else if (event.target.name == "VirTaxPercent") {
            this.setState({
                VirTaxPercent: event.target.value,
                VirTax: (Price * event.target.value) / 100
            });
        }
        else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    };

    calculateFinalPrice = () => {
        const { VirDiscountType, VirDiscount, VirTax, Price } = this.state;
        if (VirDiscountType == 1) {
            this.setState({ FinalPrice: Price - ((Price * VirDiscount) / 100) + VirTax });
        }
        else if (VirDiscountType == 2) {
            this.setState({ FinalPrice: Price - VirDiscount + VirTax });
        }
    }

    handleChipChange = (value, name) => {
        this.setState({ [name]: value.value });
    };

    handleBackButton = () => {
        this.props.history.go(-1)
    }
    handleDiscountButton = () => {
        this.setState({ discountOpen: true })
    }
    handleTaxButton = () => {
        this.setState({ taxOpen: true })
    }
    handleNoteButton = () => {
        this.setState({ noteOpen: true })
    }
    discountClose = () => {
        this.setState({
            discountOpen: false,
            VirDiscountType: this.state.DiscountType,
            VirDiscount: this.state.Discount
        })
    }
    taxClose = () => {
        this.setState({
            taxOpen: false,
            VirTax: this.state.Tax,
            VirTaxPercent: this.state.TaxPercent
        })
    }
    noteClose = () => {
        this.setState({
            noteOpen: false,
            VirDescription: this.state.Description
        })
    }
    handleDiscountAccept = () => {
        this.calculateFinalPrice();
        this.setState({
            discountOpen: false,
            DiscountType: this.state.VirDiscountType,
            Discount: this.state.VirDiscount
        })
    }
    handleTaxAccept = () => {
        this.calculateFinalPrice();
        this.setState({
            taxOpen: false,
            Tax: this.state.VirTax,
            TaxPercent: this.state.VirTaxPercent
        })
    }
    handleNoteAccept = () => {
        this.setState({
            noteOpen: false,
            Description: this.state.VirDescription
        })
    }

    render() {
        const { classes } = this.props;
        const { PlacedOrderDetails, TaxPercent, Tax, Discount, VirDiscountType, DiscountType, Price, FinalPrice } = this.state;
        return (
            <React.Fragment>
                <Paper className={`${classes.root} flex flex-1 relative overflow-hidden`}>
                    <FuseScrollbars className="w-full overflow-auto">
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {PlacedOrderDetails.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {row.MenuIdName} ({row.SizeIdName})
                                        </TableCell>
                                        <TableCell align="right">{row.Quantity}</TableCell>
                                        <TableCell align="right">{row.MenuPrice * row.Quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </FuseScrollbars>

                </Paper>
                <Paper>
                    <React.Fragment>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell rowSpan={4} />
                                    <TableCell colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="right">{formatter.format(Price)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Discount</TableCell>
                                    <TableCell align="right">
                                        {DiscountType == 1 ? Discount + " %"
                                            : formatter.format(Discount)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Tax ({TaxPercent} %)</TableCell>
                                    <TableCell align="right">{formatter.format(Tax)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">{formatter.format(FinalPrice)}</TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                        <div>
                            <Button variant="contained" className={classes.button}
                                onClick={() => this.handleBackButton()}>

                                Back
      </Button>
                            <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => this.handleDiscountButton()}>
                                Discount
      </Button>
                            <Button variant="contained" color="secondary" className={classes.button}
                                onClick={() => this.handleTaxButton()}>
                                Tax
      </Button>

                            <Button variant="contained" className={classes.button}
                                onClick={() => this.handleNoteButton()}>
                                Notes
      </Button>
                        </div>
                    </React.Fragment>
                </Paper>
                <Dialog
                    open={this.state.discountOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Discount</DialogTitle>
                    <DialogContent>
                        <FuseChipSelect
                            name='VirDiscountType'
                            className="w-full my-16"
                            value={discountTypeOptions.filter(o => o.value == VirDiscountType)}
                            onChange={(value) => this.handleChipChange(value, 'VirDiscountType')}
                            placeholder="Select Discount Type"
                            textFieldProps={{
                                label: 'Discount Type',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant: 'outlined'
                            }}
                            options={discountTypeOptions}
                            fullWidth
                        />
                        <TextField
                            className="mt-8 mb-16"
                            onChange={this.handleChange}
                            label="Discount"
                            name="VirDiscount"
                            type="number"
                            value={this.state.VirDiscount || 0}
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={event => this.discountClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={event => this.handleDiscountAccept()} color="primary" autoFocus>
                            Accept
                        </Button>

                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.taxOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Tax</DialogTitle>
                    <DialogContent>
                        <TextField
                            className="mt-8 mb-16"
                            onChange={this.handleChange}
                            label="Tax (%)"
                            name="VirTaxPercent"
                            type="number"
                            value={this.state.VirTaxPercent || 0}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            className="mt-8 mb-16"
                            onChange={this.handleChange}
                            label="Tax"
                            name="VirTax"
                            type="number"
                            value={this.state.VirTax || 0}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.taxClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={event => this.handleTaxAccept()} color="primary" autoFocus>
                            Accept
                        </Button>

                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.noteOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Note</DialogTitle>
                    <DialogContent>
                        <TextField
                            className="mt-8 mb-16"
                            onChange={this.handleChange}
                            label="Description"
                            name="VirDescription"
                            type="text"
                            value={this.state.VirDescription || ''}
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.noteClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={event => this.handleNoteAccept()} color="primary" autoFocus>
                            Accept
                        </Button>

                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        getPlacedOrder: Actions.getPlacedOrder,
        getOrderDetailByOrderId: Actions.getOrderDetailByOrderId
    }, dispatch);
}

function mapStateToProps({ auth, order }) {
    return {
        placedOrder: order.placedOrder,
        placedOrderDetails: order.summary.orderDetails,
    }
}

export default (withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(RightSide))));