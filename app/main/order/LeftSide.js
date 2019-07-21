import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import PropTypes from 'prop-types';
import { FuseAnimateGroup } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Typography,
    GridList,
    GridListTile,
    GridListTileBar,
    Icon,
    IconButton,
    TextField,
    Card,
    CardContent,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './store/actions';
import Filter from 'app/main/shared/functions/filters';
import classNames from 'classnames';

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

class LeftSide extends Component {
    state = {
        activeStep: 0,
        categories: this.props.categories,
        menus: null,
        prices: null,
        categoryPicked: null,
        menuPicked: null,
        menuNamePicked: '',
        pricePicked: null,
        priceNamePicked: null,
        quantityPicked: null,
        description: '',
        open: false
    };

    componentDidMount() {
        this.props.getCategories();
        this.props.getMenus();
        this.props.getPrices();
    };

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.categories, prevProps.categories)) {
            this.setState({ categories: this.props.categories })
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
            quantityPicked: null
        });
    }

    handleModalAccept = () => {
        this.setState(state => ({
            open: false,
            activeStep: state.activeStep + 1
        }));
    }

    getFilteredMenuArray = (data, categoryId) => {

        let newData = { data };
        if (!categoryId) {
            return newData;
        }
        newData = _.filter(newData.data, item => {
            if (item.CategoryId == categoryId) {
                return true;
            }
        });
        return newData;
    };

    getFilteredPriceArray = (data, menuId) => {

        let newData = { data };
        if (!menuId) {
            return newData;
        }
        newData = _.filter(newData.data, item => {
            if (item.MenuId == menuId) {
                return true;
            }
        });
        return newData;
    };

    handleCategoryClick = (id) => {
        if (id && id > 0) {
            const data = this.getFilteredMenuArray(this.props.menus, id);
            this.setState(state => ({
                activeStep: state.activeStep + 1,
                categoryPicked: id,
                menus: data
            }));
        }
    }
    handleMenuClick = (id) => {
        if (id && id > 0) {
            const menuName = this.state.menus ? this.state.menus.find(x => x.Id == id).Name : '';
            const data = this.getFilteredPriceArray(this.props.prices, id);
            this.setState(state => ({
                activeStep: state.activeStep + 1,
                menuPicked: id,
                menuNamePicked: menuName,
                prices: data
            }));
        }
    }
    handlePriceClick = (id) => {
        if (id && id > 0) {
            const sizeName = this.state.prices ? this.state.prices.find(x => x.Id == id).SizeIdName : '';
            this.setState(state => ({
                activeStep: state.activeStep + 1,
                pricePicked: id,
                sizeNamePicked: sizeName
            }));
        }
    }
    handleQuantityClick = (id) => {
        if (id && id > 0) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
                quantityPicked: id
            }));
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = (step) => {
        switch (step) {
            case 1:
                {
                    this.setState(() => ({
                        activeStep: step - 1,
                        categoryPicked: null,
                        menus: null
                    }));
                }
            case 2:
                {
                    this.setState(() => ({
                        activeStep: step - 1,
                        menuPicked: null,
                        prices: null,
                        pricePicked: null
                    }));
                }
            case 3:
                {
                    this.setState(() => ({
                        activeStep: step - 1,
                        quantityPicked: null
                    }));
                }
            case 4:
                {
                    this.setState(() => ({
                        activeStep: step - 1,
                        description: ''
                    }));
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
        const categoryName = this.state.categories && this.state.categoryPicked ? this.state.categories.find(x => x.Id == this.state.categoryPicked).Name : '';
        return [categoryName ? 'Selected ' + categoryName : 'Select Category',
        this.state.menuNamePicked ? 'Selected ' + this.state.menuNamePicked : 'Select Item',
            'Select Size', 'Select Quantity', 'Description', 'Summary'];
    }

    getStepContent = (step) => {
        const categoryName = this.state.categories && this.state.categoryPicked ? this.state.categories.find(x => x.Id == this.state.categoryPicked).Name : '';
        const sizeName = this.state.prices && this.state.pricePicked ? this.state.prices.find(x => x.Id == this.state.pricePicked).SizeIdName : '';
        const price = this.state.prices && this.state.pricePicked ? this.state.prices.find(x => x.Id == this.state.pricePicked).Price : '';
        switch (step) {
            case 0:
                {
                    return (
                        <GridList className="" spacing={16} cols={0}>
                            {this.state.categories ? this.state.categories.map((c, index) => (
                                <GridListTile
                                    classes={{
                                        root: "w-1 sm:w-1/2 md:w-1/4",
                                        tile: "rounded-8"
                                    }}
                                    key={index}
                                    onClick={() => this.handleCategoryClick(c.Id)}
                                >
                                    <img src='http://react-material.fusetheme.com/assets/images/profile/a-walk-amongst-friends-small.jpg' alt={c.Name} />
                                    <GridListTileBar
                                        title={c.Name}
                                        actionIcon={
                                            <IconButton>
                                                <Icon className="text-white opacity-75">check</Icon>
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            )) : ''}
                        </GridList>
                    )
                }

            case 1:
                {
                    return (
                        <GridList className="" spacing={16} cols={0}>
                            {this.state.menus ? this.state.menus.length > 0 ? this.state.menus.map((c, index) => (
                                <GridListTile
                                    classes={{
                                        root: "w-1 sm:w-1/2 md:w-1/4",
                                        tile: "rounded-8"
                                    }}
                                    key={index}
                                    onClick={() => this.handleMenuClick(c.Id)}
                                >
                                    <img src='http://react-material.fusetheme.com/assets/images/profile/a-walk-amongst-friends-small.jpg' alt={c.Name} />
                                    <GridListTileBar
                                        title={c.Name}
                                        actionIcon={
                                            <IconButton>
                                                <Icon className="text-white opacity-75">check</Icon>
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            )) : <Typography variant="h5" gutterBottom>You don't have any food in &nbsp;
                        {categoryName ? categoryName : ''}</Typography>
                                : ''}
                        </GridList>
                    )
                }
            case 2:
                {
                    return (
                        <GridList className="" spacing={0} cols={6}>
                            {this.state.prices ? this.state.prices.length > 0 ? this.state.prices.map((c, index) => (
                                <Button key={index}
                                    variant={this.state.pricePicked && this.state.pricePicked == c.Id ? "contained" : "outlined"}
                                    color={this.state.pricePicked && this.state.pricePicked == c.Id ? "secondary" : "default"}
                                    className={this.props.classes.button}
                                    onClick={() => this.handlePriceClick(c.Id)}>
                                    {c.SizeIdName} <br />
                                    {Filter.svcMoney(c.Price)}
                                </Button>)) : <Typography variant="h5" gutterBottom>You did not add size in &nbsp;
                        {this.state.menuNamePicked ? this.state.menuNamePicked : ''}</Typography>
                                : ""
                            }
                        </GridList>
                    )
                }
            case 3:
                {
                    return (
                        <React.Fragment>
                            {[...Array(10)].map((x, index) =>
                                <Button key={index} size="large"
                                    variant={this.state.quantityPicked && this.state.quantityPicked == index + 1 ? "contained" : "outlined"}
                                    color={this.state.quantityPicked && this.state.quantityPicked == index + 1 ? "secondary" : "default"}
                                    className={this.props.classes.button}
                                    onClick={() => this.handleQuantityClick(index + 1)}>
                                    {index + 1}
                                </Button>
                            )}
                            <Button size="large"
                                variant={this.state.quantityPicked && this.state.quantityPicked > 10 ? "contained" : "outlined"}
                                color={this.state.quantityPicked && this.state.quantityPicked > 10 ? "secondary" : "default"}
                                className={this.props.classes.button}
                                onClick={() => this.handleClickOpen()}>
                                {this.state.quantityPicked && this.state.quantityPicked > 10 ? this.state.quantityPicked : '?'}
                            </Button>
                            <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Quantity</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please enter the quantity you want
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        onChange={this.handleChange}
                                        margin="dense"
                                        label="Quantity"
                                        name="quantityPicked"
                                        type="number"
                                        rows={5}
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => this.handleClose()} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => this.handleModalAccept()} color="primary">
                                        Accept
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            case 4:
                {
                    return (
                        <React.Fragment>
                            <TextField
                                className="mt-8 mb-16"
                                onChange={this.handleChange}
                                label="description"
                                name="description"
                                type="text"
                                value={this.state.description || ''}
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
                                Enter
                            </Button>
                        </React.Fragment>
                    )
                }
            case 5:
                {
                    return (
                        <div className="w-full max-w-480 sm:w-1/2 p-12">

                            <Card square>

                                <div className={classNames(this.props.classes.cardHeader, "px-24 py-16")}>
                                    <Typography variant="h6" color="inherit">{this.state.menuNamePicked}</Typography>
                                </div>

                                <CardContent className="p-32">

                                    <div className="flex justify-center">
                                        <div className="flex items-end">
                                            <Typography className="text-72 mx-4 font-light leading-none">
                                                {Filter.svcMoney(this.state.quantityPicked * price)}
                                            </Typography>
                                        </div>
                                    </div>

                                    <Divider className="my-32" />

                                    <div className="flex flex-col">
                                        <Typography variant="h6" className="">
                                            <span className="font-bold mr-16">Size:</span>
                                            {sizeName}
                                        </Typography>
                                        <Typography variant="h6" className="">
                                            <span className="font-bold mr-16">Quantity:</span>
                                            {this.state.quantityPicked}
                                        </Typography>
                                        <Typography variant="h6" className="">
                                            <span className="font-bold mr-16">Price:</span>
                                            {Filter.svcMoney(price)}
                                        </Typography>
                                        <Typography variant="h6" className="">
                                            <span className="font-bold mr-16">Note:</span>
                                            {this.state.description && this.state.description.length > 0 ? this.state.description : 'Empty'}
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex justify-center pb-32">
                                    <Button variant="contained" color="secondary" className="w-128"
                                        onClick={() => this.acceptOrder()}>Accept</Button>
                                </div>
                            </Card>
                        </div>
                    )
                }
            default:
                return (
                    <Typography variant="h5" gutterBottom>Unknown step</Typography>
                )
        }
    }

    acceptOrder = () => {
        const { categoryPicked, menuPicked, pricePicked, 
            quantityPicked, description, menuNamePicked, sizeNamePicked } = this.state;
        const price = this.state.prices && this.state.pricePicked ? this.state.prices.find(x => x.Id == this.state.pricePicked).Price : '';
        let obj = {
            CategoryId: categoryPicked,
            MenuId: menuPicked,
            MenuIdName: menuNamePicked,
            MenuPriceId: pricePicked,
            Quantity: quantityPicked,
            Price: price * quantityPicked,
            SizeIdName: sizeNamePicked,
            Description: description
        };
        this.props.acceptOrder(obj);
        this.props.refresh();
        this.setState({
            categoryPicked: null,
            menuPicked: null,
            menuNamePicked: '',
            pricePicked: null,
            quantityPicked: null,
            sizeNamePicked: '',
            description: '',
            activeStep: 0
        });
    }

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;
        return (
            <div>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <FuseAnimateGroup
                                    enter={{
                                        animation: "transition.slideUpBigIn"
                                    }}
                                >
                                    {this.getStepContent(index)}
                                </FuseAnimateGroup>

                                <div className={`${classes.actionsContainer} mt-32`}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={() => this.handleBack(index)}
                                            className={classes.button}
                                        >
                                            Back
                                            </Button>
                                        {/* <Button
                                            disabled={activeStep === steps.length - 1 &&
                                                !pricePicked}
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button> */}
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    }
}

LeftSide.propTypes = {
    classes: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        getCategories: Actions.getCategories,
        getMenus: Actions.getMenus,
        getPrices: Actions.getPrices,
        acceptOrder: Actions.acceptOrder
    }, dispatch);
}

function mapStateToProps({ auth, order }) {
    return {
        user: auth.user,
        categories: order.orders.categories,
        menus: order.orders.menus,
        prices: order.orders.prices
    }
}

export default (withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSide))));
