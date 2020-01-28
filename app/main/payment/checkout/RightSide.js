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
    DialogTitle,
    TextField,
    Typography,
    Tabs,
    Tab,
    InputAdornment,
    Fab,
    Icon
} from '@material-ui/core';
import { FuseScrollbars, FuseChipSelect } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';
import Filter from 'app/main/shared/functions/filters';
import withReducer from 'app/store/withReducer';
import * as Actions from '../../order/store/actions';
import * as SharedActions from 'app/main/shared/options/store/actions';
import SharedReducer from 'app/main/shared/options/store/reducers';
import {
    Money,
    CreditCard,
    CardGiftcard
} from '@material-ui/icons';
import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';
import PrintReceiptDialog from './PrintReceiptDialog';


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
        VirTaxType: 0,
        TaxType: 0,
        VirTax: 0,
        Tax: 0,
        VirTaxPercent: 0,
        TaxPercent: 0,
        Price: this.props.placedOrder.data ? this.props.placedOrder.data.Price : 0,
        FinalPrice: 0,
        PlacedOrderDetails: this.props.placedOrderDetails,
        value: 0,
        VirReceivedAmount: 0,
        ReceivedAmount: 0,
        VirChangeAmount: 0,
        ChangeAmount: 0,
        VirTipAmount: 0,
        TipAmount: 0,
        checkoutOpen: false,
        printReceiptModalOpen: false,
        isFinish: false
    }

    componentDidMount() {
        this.props.getPlacedOrder(this.props.match.params.id);
        this.props.getOrderDetailByOrderId(this.props.match.params);
        if (!this.props.options.options['options_tax_/option/gettax']) {
            // this.getTaxType();
            this.props.getOptionsByKey('tax', '/option/gettax');
        }
        this.calculateFinalPrice();
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
                Price: Price,
                isFinish: this.props.placedOrder.data.IsFinish == 1 ? true : false
            });
            this.props.getBranchByOrder(this.props.placedOrder.data.BranchId);
        }
        if (!_.isEqual(this.state.Price, prevState.Price)) {
            this.calculateFinalPrice();
        }
        if (!_.isEqual(this.props.checkoutOpen, prevProps.checkoutOpen)) {
            if (!this.props.checkoutOpen) {
                this.setState({
                    checkoutOpen: true
                });
            }
            else {
                this.setState({
                    checkoutOpen: this.props.checkoutOpen
                });
            }
        }
        if (!_.isEqual(this.props.finishButtonClick, prevProps.finishButtonClick)) {
            this.setOrderFinish();
        }
        if (!_.isEqual(this.props.rePrintButtonClick, prevProps.rePrintButtonClick)) {
            this.setState({
                printReceiptModalOpen: true
            });
        }
        // set default tax select (not done yet)
        // if (!_.isEqual(this.props.options.options['options_tax_/option/gettax'],
        //     prevProps.options.options['options_tax_/option/gettax'])) {
        //     this.setState({
        //         VirTaxType: this.props.options.options['options_tax_/option/gettax'][0].Value,
        //         TaxType: this.props.options.options['options_tax_/option/gettax'][0].Value
        //     });
        //     this.handleTaxTypeChipChange({
        //         value: this.props.options.options['options_tax_/option/gettax'][0].Value,
        //         label: this.props.options.options['options_tax_/option/gettax'][0].DisplayText
        //     }, 'VirTaxType');
        // }
    }

    setOrderFinish = () => {
        const { TaxType, Tax, DiscountType, Discount, ReceivedAmount, ChangeAmount, TipAmount } = this.state;
        const { placedOrder } = this.props;
        let { data } = placedOrder;
        data.TaxId = TaxType;
        data.Tax = Tax;
        data.DiscountType = DiscountType;
        data.Discount = Discount;
        let checkout = {
            //set CheckoutTypeId (Cash : 1)
            CheckoutTypeId: 1,
            ReceivedAmount: ReceivedAmount,
            ChangeAmount: ChangeAmount,
            TipAmount: TipAmount,
            PlacedOrder: data
        };

        const request = AxiosConfig.put(Constants.API_PLACED_ORDER.setFinishOrder, checkout);

        request.then((response) => {
            if (response.data) {
                showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS });

                //if success, invoke getPlaceOrder again to re-set state in redux
                this.props.getPlacedOrder(this.props.match.params.id);
                this.setState({
                    printReceiptModalOpen: true
                });
            }
            else {
                showMessage({ message: Constants.MODAL.SAVE_DATA_FAIL, variant: Constants.VARIANT.ERROR });
            }
        });
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
        // else if (event.target.name == "VirTaxType") {
        //     this.setState({
        //         VirTaxType: event.target.value,
        //         VirTax: (Price * event.target.value) / 100
        //     });
        // }
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

    handleTaxTypeChipChange = (value, name) => {
        const { Price } = this.state;
        let pieces = value.label.split(/[\s_]+/);
        let taxPercent = pieces[pieces.length - 1];
        this.setState({
            [name]: value.value,
            VirTaxPercent: taxPercent,
            VirTax: (Price * taxPercent) / 100
        });
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
            VirTaxPercent: this.state.TaxPercent,
            VirTaxType: this.state.TaxType
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
            TaxPercent: this.state.VirTaxPercent,
            TaxType: this.state.VirTaxType
        })
    }
    handleNoteAccept = () => {
        this.setState({
            noteOpen: false,
            Description: this.state.VirDescription
        })
    }

    checkoutClose = () => {
        const { ChangeAmount, ReceivedAmount, TipAmount } = this.state;
        this.setState({
            checkoutOpen: false,
            VirChangeAmount: ChangeAmount,
            VirReceivedAmount: ReceivedAmount,
            VirTipAmount: TipAmount
        });
    }

    handleCheckoutAccept = () => {
        const { VirChangeAmount, VirReceivedAmount, VirTipAmount } = this.state;
        this.setState({
            checkoutOpen: false,
            ChangeAmount: VirChangeAmount,
            ReceivedAmount: VirReceivedAmount,
            TipAmount: VirTipAmount
        })
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    handleReceivedAmountChange = (event, value) => {
        const { FinalPrice } = this.state;
        this.setState({
            VirReceivedAmount: event.target.value,
            VirChangeAmount: parseFloat(event.target.value) - FinalPrice
        });
    }

    getTabContent = () => {
        const { value } = this.state;
        if (value == 0) {
            return (
                <Typography component="div" style={{ padding: 8 * 3 }}>
                    <TextField
                        className="mt-8 mb-16"
                        onChange={this.handleReceivedAmountChange}
                        label="Cash"
                        name="VirReceivedAmount"
                        type="number"
                        value={this.state.VirReceivedAmount || 0}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        fullWidth
                    />
                    <TextField
                        error
                        className="mt-8 mb-16"
                        label="Change"
                        name="VirChangeAmount"
                        type="number"
                        value={this.state.VirChangeAmount || 0}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            readOnly: true
                        }}
                        fullWidth
                    />
                    <TextField
                        className="mt-8 mb-16"
                        onChange={this.handleChange}
                        label="Tip"
                        name="VirTipAmount"
                        type="number"
                        value={this.state.VirTipAmount || 0}
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        fullWidth
                    />
                    {/* <Fab color="secondary" aria-label="Edit">
                        <Icon>check</Icon>
                    </Fab> */}
                </Typography>
            )
        }
        else if (value == 1) {
            return (
                this.TabContainer("Page Two")
            )
        }
        else if (value == 2) {
            return (
                this.TabContainer("Page Three")
            )
        }
    }

    TabContainer = (props) => {
        return (
            <Typography component="div" style={{ padding: 8 * 3 }}>
                {props}
            </Typography>
        );
    }

    handlePrintReceipt = () => {
        this.setState({ printReceiptModalOpen: false })
    }

    render() {
        const { classes } = this.props;
        const { PlacedOrderDetails, TaxPercent, Tax, Discount, VirDiscountType, DiscountType, Price,
            FinalPrice, VirTaxType, checkoutOpen, isFinish } = this.state;
        const options = this.props.options.options['options_tax_/option/gettax'] ? this.props.options.options['options_tax_/option/gettax'].map(o => ({ value: o.Value, label: o.DisplayText })) : []
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
                                            {row.Description.length > 0 ?
                                                <div dangerouslySetInnerHTML={{ __html: row.Description.replace(/\r?\n/g, '<br />') }} />
                                                : ''}
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
                                    <TableCell align="right">{formatter.format(FinalPrice)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                        <div>
                            <Button variant="contained" className={classes.button}
                                onClick={() => this.handleBackButton()}>

                                Back
      </Button>
                            <Button variant="contained" color="primary" className={classes.button}
                                disabled={isFinish}
                                onClick={() => this.handleDiscountButton()}>
                                Discount
      </Button>
                            <Button variant="contained" color="secondary" className={classes.button}
                                disabled={isFinish}
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
                        <FuseChipSelect
                            name='VirTaxType'
                            className="w-full my-16"
                            value={VirTaxType ? options.filter(o => o.value == VirTaxType) : { value: '', label: 'Select Tax' }}
                            onChange={(value) => this.handleTaxTypeChipChange(value, 'VirTaxType')}
                            placeholder={"Select Tax"}
                            textFieldProps={{
                                label: 'Tax',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant: 'outlined'
                            }}
                            required
                            options={options}
                            fullWidth
                        />
                        <TextField
                            className="mt-8 mb-16"
                            onChange={this.handleChange}
                            label="Tax (%)"
                            name="VirTaxPercent"
                            type="number"
                            value={this.state.VirTaxPercent || 0}
                            InputProps={{
                                readOnly: true
                            }}
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
                                readOnly: true
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
                <Dialog
                    open={checkoutOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Checkout</DialogTitle>
                    <DialogContent>
                        <Paper square className={classes.root}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleTabChange}
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="secondary"
                            >
                                <Tab icon={<Money />} label="CASH" />
                                <Tab icon={<CreditCard />} label="CREDIT/ DEBIT" />
                                <Tab icon={<CardGiftcard />} label="GIFT CARD" />
                            </Tabs>
                        </Paper>
                        {this.getTabContent()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={event => this.checkoutClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={event => this.handleCheckoutAccept()} color="primary" autoFocus>
                            Accept
                        </Button>

                    </DialogActions>
                </Dialog>
                {this.state.printReceiptModalOpen ? <PrintReceiptDialog open={this.state.printReceiptModalOpen} printAction={this.handlePrintReceipt}
                    order={this.props.placedOrder.data} orders={PlacedOrderDetails} branch={this.props.branch} /> : null}
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        getPlacedOrder: Actions.getPlacedOrder,
        getOrderDetailByOrderId: Actions.getOrderDetailByOrderId,
        getOptionsByKey: SharedActions.getOptionsByKey,
        getBranchByOrder: Actions.getBranchByOrder
    }, dispatch);
}

function mapStateToProps({ auth, order, options }) {
    return {
        placedOrder: order.placedOrder,
        placedOrderDetails: order.summary.orderDetails,
        options: options,
        branch: order.summary.branch
    }
}

export default withReducer('options', SharedReducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(RightSide))));