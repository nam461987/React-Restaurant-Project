import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import PropTypes from 'prop-types';
import { FuseAnimateGroup, FuseChipSelect } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    GridList,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Divider
} from '@material-ui/core';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from '../store/actions';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    header: {
        height: 600,
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color: theme.palette.primary.contrastText
    },
    cardHeader: {
        backgroundColor: theme.palette.primary[800],
        color: theme.palette.getContrastText(theme.palette.primary[800])
    }
});

class Modal extends Component {
    state = {
        activeStep: 0,
        orderTypes: null,
        customers: null,
        orderChannels: null,
        tables: null,
        OrderTypeId: null,
        CustomerId: null,
        OrderChannelId: null,
        TableId: null,
        PeopleNum: null,
        OrderTypeIdName: '',
        CustomerIdName: '',
        CustomerName: '',
        CustomerPhone: '',
        OrderChannelIdName: '',
        TableIdName: '',
        OrderTime: null,
        DeliveryAddress: '',
        Description: '',
        open: true
    };

    componentDidMount() {
        this.props.getCustomers();
        this.props.getOrderChannels();
        this.props.getTables();
    };

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.order, prevProps.order)) {
            if(!this.props.order){
                this.setState(state => ({
                    open: true
                }))
            }
        }
    }

    handleOrderTypeClick = (id, name) => {
        if (id && id > 0) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
                OrderTypeId: id,
                OrderTypeIdName: name
            }));
        }
    }

    handleTableClick = (id, name) => {
        if (id && id > 0) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
                TableId: id,
                TableIdName: name
            }));
        }
    }
    handlePeopleNumClick = (id) => {
        if (id && id > 0) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
                PeopleNum: id
            }));
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleNext = () => {
        const steps = this.getSteps();
        if (this.state.activeStep == steps.length - 1) {
            let result = window.confirm("Are you sure?");
            if (result) {
                const { OrderTypeId, CustomerId, OrderChannelId, TableId, PeopleNum, OrderTypeIdName, CustomerIdName,
                    CustomerName,CustomerPhone, OrderChannelIdName, TableIdName, Description } = this.state;
                let obj = {
                    OrderTypeId: OrderTypeId,
                    CustomerId: CustomerId,
                    OrderChannelId: OrderChannelId,
                    TableId: TableId,
                    PeopleNum: PeopleNum,
                    OrderTypeIdName: OrderTypeIdName,
                    CustomerIdName: CustomerIdName,
                    CustomerName: CustomerName,
                    CustomerPhone:CustomerPhone,
                    OrderChannelIdName: OrderChannelIdName,
                    TableIdName: TableIdName,
                    Description: Description
                };
                this.props.acceptPreOrder(obj);
                this.setState({
                    OrderTypeId: null,
                    CustomerId: null,
                    OrderChannelId: null,
                    TableId: null,
                    PeopleNum: null,
                    OrderTypeIdName: '',
                    CustomerIdName: '',
                    CustomerName: '',
                    CustomerPhone:'',
                    OrderChannelIdName: '',
                    TableIdName: '',
                    Description: '',
                    activeStep: 0,
                    open: false
                });
            }
        }
        else {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        }
    };

    handleBack = (step) => {
        const { OrderTypeId } = this.state;
        switch (step) {
            case 1:
                {
                    if (OrderTypeId == 1) {
                        this.setState(() => ({
                            activeStep: step - 1,
                            PeopleNum: null
                        }));
                    }
                    else if (OrderTypeId == 2) {
                        this.setState(() => ({
                            activeStep: step - 1,
                            CustomerName: '',
                            CustomerPhone:''
                        }));
                    }
                    else if (OrderTypeId == 3) {
                        this.setState(() => ({
                            activeStep: step - 1,
                            CustomerName: '',
                            CustomerPhone:'',
                            CustomerId: null,
                            CustomerIdName: ''
                        }));
                    }
                }
            case 2:
                {
                    if (OrderTypeId == 1) {
                        this.setState(() => ({
                            activeStep: step - 1,
                            TableId: null,
                            TableIdName: ''
                        }));
                    }
                    else if (OrderTypeId == 2) {
                        this.setState(() => ({
                            activeStep: step - 1,
                            Description: ''
                        }));
                    }
                    else if (OrderTypeId == 3) {
                        this.setState(() => ({
                            activeStep: step - 1,
                            OrderChannelId: null,
                            OrderChannelIdName: ''
                        }));
                    }
                }
            case 3:
                {
                    if (OrderTypeId == 1 || OrderTypeId == 3) {
                        this.setState(() => ({
                            activeStep: step - 1,
                            Description: ''
                        }));
                    }
                }
            default:
                {
                    this.setState(() => ({
                        activeStep: step - 1
                    }));
                }
        }

    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    getSteps = () => {
        const { OrderTypeId, OrderTypeIdName, PeopleNum, CustomerName,CustomerPhone, CustomerId } = this.state;
        if (!OrderTypeId) {
            return ['Select Order Type']
        }
        // Dine In
        else if (OrderTypeId == 1) {
            return [OrderTypeId ? 'Selected ' + OrderTypeIdName : 'Select Order Type',
            PeopleNum ? 'Selected ' + PeopleNum + ' people' : 'Select amount of people',
                'Select Table', 'Description'];
        }
        // To Go
        else if (OrderTypeId == 2) {
            return [OrderTypeId ? 'Selected ' + OrderTypeIdName : 'Select Order Type',
            CustomerName ? CustomerName : 'Enter Customer Info',
                'Decription']
        }
        // Delivery
        else if (OrderTypeId == 3) {
            return [OrderTypeId ? 'Selected ' + OrderTypeIdName : 'Select Order Type',
            CustomerId || CustomerName.length > 0 ? 'Selected' : 'Select Customer',
                'Select Order Channel', 'Description'];
        }
    }

    getStepContent = (step) => {
        const { OrderTypeId, PeopleNum, CustomerName,CustomerPhone, CustomerId, TableId,
            OrderChannelId } = this.state;
        const { orderChannels, customers, tables } = this.props;
        switch (step) {
            case 0:
                {
                    return (
                        <Grid
                            container
                            spacing={8}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Button
                                    variant={OrderTypeId && OrderTypeId == 1 ? "contained" : "outlined"}
                                    color={OrderTypeId && OrderTypeId == 1 ? "secondary" : "default"}
                                    style={{ padding: 50 }}
                                    fullWidth
                                    onClick={event => this.handleOrderTypeClick(1, 'Dine In')}>
                                    Dine In
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant={OrderTypeId && OrderTypeId == 2 ? "contained" : "outlined"}
                                    color={OrderTypeId && OrderTypeId == 2 ? "secondary" : "default"}
                                    style={{ padding: 50 }}
                                    onClick={event => this.handleOrderTypeClick(2, 'To Go')}>
                                    To Go
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant={OrderTypeId && OrderTypeId == 3 ? "contained" : "outlined"}
                                    color={OrderTypeId && OrderTypeId == 3 ? "secondary" : "default"}
                                    style={{ padding: 50 }}
                                    onClick={event => this.handleOrderTypeClick(3, 'Delivery')}>
                                    Delivery
                                </Button>
                            </Grid>
                        </Grid>
                    )
                }

            case 1:
                {
                    if (OrderTypeId == 1) {
                        return (
                            [...Array(20)].map((x, index) =>
                                <Button key={index} size="large"
                                    variant={PeopleNum && PeopleNum == index + 1 ? "contained" : "outlined"}
                                    color={PeopleNum && PeopleNum == index + 1 ? "secondary" : "default"}
                                    className={this.props.classes.button}
                                    onClick={() => this.handlePeopleNumClick(index + 1)}>
                                    {index + 1}
                                </Button>
                            )
                        )
                    }
                    if (OrderTypeId == 2) {
                        return (
                            <React.Fragment>
                                <TextField
                                    className="mt-8 mb-16"
                                    onChange={this.handleChange}
                                    label="Customer Name"
                                    name="CustomerName"
                                    type="text"
                                    value={CustomerName || ''}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mt-8 mb-16"
                                    onChange={this.handleChange}
                                    label="Customer Phone"
                                    name="CustomerPhone"
                                    type="text"
                                    value={CustomerPhone || ''}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={this.props.classes.button}
                                >
                                    Enter
                            </Button>
                            </React.Fragment>
                        )
                    }
                    if (OrderTypeId == 3) {
                        const customerOptions = customers ?
                            customers.map(o => ({ value: o.Id, label: o.Name + ' - ' + o.Email })) : []
                        return (
                            <React.Fragment>
                                <FuseChipSelect
                                    name='CustomerId'
                                    className="w-full my-16"
                                    value={CustomerId ? customerOptions.filter(o => o.value == CustomerId) : { value: '', label: 'Select Customer' }}
                                    onChange={(value) => this.handleChipChange(value, 'CustomerId')}
                                    placeholder="Select Customer"
                                    textFieldProps={{
                                        label: 'Customer',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant: 'outlined'
                                    }}
                                    options={customerOptions}
                                    fullWidth
                                />
                                <Divider variant="inset" />
                                <Typography variant="h6" gutterBottom>OR</Typography>
                                <Divider variant="inset" />
                                <TextField
                                    className="mt-8 mb-16"
                                    onChange={this.handleChange}
                                    label="Customer Name"
                                    name="CustomerName"
                                    type="text"
                                    value={CustomerName || ''}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mt-8 mb-16"
                                    onChange={this.handleChange}
                                    label="Customer Phone"
                                    name="CustomerPhone"
                                    type="text"
                                    value={CustomerPhone || ''}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={this.props.classes.button}
                                >
                                    Enter
                            </Button>
                            </React.Fragment>
                        )
                    }
                }
            case 2:
                {
                    if (OrderTypeId == 1) {
                        return (
                            <GridList className="" spacing={0} cols={6}>
                                {tables ? tables.length > 0 ? tables.map((c, index) => (
                                    <Button key={index}
                                        variant={TableId && TableId == c.Id ? "contained" : "outlined"}
                                        color={TableId && TableId == c.Id ? "secondary" : "default"}
                                        className={this.props.classes.button}
                                        onClick={() => this.handleTableClick(c.Id, c.Name)}>
                                        {c.Name} <br />
                                        ( {c.Capacity} people )
                                    </Button>)) : <Typography variant="h5" gutterBottom>No data</Typography>
                                    : ""
                                }
                            </GridList>
                        )
                    }
                    if (OrderTypeId == 2) {
                        return (
                            <React.Fragment>
                                <TextField
                                    className="mt-8 mb-16"
                                    onChange={this.handleChange}
                                    label="Description"
                                    name="Description"
                                    type="text"
                                    value={this.state.Description || ''}
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={this.props.classes.button}
                                >
                                    Finish
                                </Button>
                            </React.Fragment>
                        )
                    }
                    if (OrderTypeId == 3) {
                        const orderChannelOptions = orderChannels ?
                            orderChannels.map(o => ({ value: o.Id, label: o.Name })) : []
                        return (
                            <React.Fragment>
                                <FuseChipSelect
                                    name='OrderChannelId'
                                    className="w-full my-16"
                                    value={OrderChannelId ? orderChannelOptions.filter(o => o.value == OrderChannelId) : { value: '', label: 'Select Order Channel' }}
                                    onChange={(value) => this.handleChipChange(value, 'OrderChannelId')}
                                    placeholder="Select Order Channel"
                                    textFieldProps={{
                                        label: 'Order Channel',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant: 'outlined'
                                    }}
                                    options={orderChannelOptions}
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={this.props.classes.button}
                                >
                                    Enter
                        </Button>
                            </React.Fragment>
                        )
                    }
                }
            case 3:
                {
                    return (
                        <React.Fragment>
                            <TextField
                                className="mt-8 mb-16"
                                onChange={this.handleChange}
                                label="Description"
                                name="Description"
                                type="text"
                                value={this.state.Description || ''}
                                multiline
                                rows={5}
                                variant="outlined"
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}
                                className={this.props.classes.button}
                            >
                                Finish
                            </Button>
                        </React.Fragment>
                    )
                }
            default:
                return (
                    <Typography variant="h5" gutterBottom>Unknown step</Typography>
                )
        }
    }

    handleChipChange = (value, name) => {
        if (name == "OrderChannelId") {
            const OrderChannelIdName = value.value ? this.props.orderChannels.find(x => x.Id == value.value).Name : '';
            this.setState({ OrderChannelIdName: OrderChannelIdName });
        }
        this.setState({ [name]: value.value });
    };

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;
        return (
            <div>
                <Dialog maxWidth='md' fullWidth open={this.state.open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Pre-order</DialogTitle>
                    <DialogContent>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            <div>
                                <FuseAnimateGroup
                                    enter={{
                                        animation: "transition.slideUpBigIn"
                                    }}
                                >
                                    {this.getStepContent(activeStep)}
                                </FuseAnimateGroup>
                                <div className={`${classes.actionsContainer} mt-32`}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={() => this.handleBack(activeStep)}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        );
    }
}

Modal.propTypes = {
    classes: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        getCustomers: Actions.getCustomers,
        getOrderChannels: Actions.getOrderChannels,
        getTables: Actions.getTables,
        acceptPreOrder: Actions.acceptPreOrder
    }, dispatch);
}

function mapStateToProps({ auth, order }) {
    return {
        user: auth.user,
        customers: order.orders.customers,
        orderChannels: order.orders.orderChannels,
        tables: order.orders.tables,
        order: order.order.order
    }
}

export default (withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal))));
