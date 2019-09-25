import React, { Component } from 'react';
import {
    withStyles,
    Button,
    Card,
    CardContent,
    Icon,
    Typography,
    CardActions,
    Divider,
    FormControl,
    LinearProgress,
    List,
    ListItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
    IconButton,
    TextField,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import withReducer from 'app/store/withReducer';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import Filter from 'app/main/shared/functions/filters';

const styles = theme => ({
    header: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position: 'absolute',
        top: -64,
        left: 0,
        opacity: .04,
        fontSize: 512,
        width: 512,
        height: 512,
        pointerEvents: 'none'
    }
});

class WaitingOrders extends Component {

    state = {
        waitingOrders: this.props.waitingOrders,
        waitingOrderDetails: this.props.waitingOrderDetails
    };

    componentDidMount() {
        this.props.getWaitingOrders();
        this.props.getWaitingOrdersDetail();
        this.interval = setInterval(() => {
            this.props.getWaitingOrders();
            this.props.getWaitingOrdersDetail();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.waitingOrders, prevProps.waitingOrders) ||
            !_.isEqual(this.props.searchText, prevProps.searchText) ||
            !_.isEqual(this.props.categoryFilter, prevProps.categoryFilter)
        ) {
            const data = this.getFilteredArray(this.props.waitingOrders, this.props.searchText, this.props.categoryFilter);
            this.setState({ waitingOrders: data })
        }
        if (!_.isEqual(this.props.waitingOrderDetails, prevProps.waitingOrderDetails)) {
            this.setState({ waitingOrderDetails: this.props.waitingOrderDetails });
        }
    }

    getFilteredArray = (data, searchText, categoryFilter) => {
        if (searchText.length === 0 && categoryFilter === "all") {
            return data;
        }

        return _.filter(data, item => {
            if (categoryFilter !== "all" && item.OrderProcessIdName !== categoryFilter) {
                return false;
            }
            return item.Code.toLowerCase().includes(searchText.toLowerCase())
        });
    };

    getOrderDetailByOrder = (id) => {
        const { waitingOrderDetails } = this.state;
        return (
            waitingOrderDetails && waitingOrderDetails.filter(f => f.PlacedOrderId == id).length > 0 &&
            (<List dense>
                {waitingOrderDetails.filter(f => f.PlacedOrderId == id).map(item => {
                    const content = <React.Fragment>
                        <Typography variant="subtitle1">{item.MenuIdName} ({item.SizeIdName}) <span className="font-bold text-blue">x {item.Quantity}</span></Typography>
                        {item.Description.length > 0 ?
                            <div dangerouslySetInnerHTML={{ __html: item.Description.replace(/\r?\n/g, '<br />') }} />
                            : ''}
                    </React.Fragment>;
                    return (
                        <ListItem
                            className="p-0 mt-8"
                            key={item.Id}
                            dense
                        >
                            <FormControl className="w-full" component="fieldset">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={item.IsFinish == 1}
                                            onChange={event => this.handleCheck(event, { id: item.Id, check: item.IsFinish })} value={`${item.IsFinish}`} />}
                                        label={content}
                                    />
                                </FormGroup>
                            </FormControl>
                            <IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete">
                                <Icon fontSize="small">delete</Icon>
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>)
        )

    }

    buttonStatus = (status) => {
        switch (status) {
            case true:
                return "COMPLETED";
            case false:
                return "PREPARING";
            default:
                return "PREPARING";
        }
    };

    handleCheck = async (event, obj) => {
        const { waitingOrderDetails } = this.state;

        let changeCheckBoxValue = obj.check == 1 ? 0 : 1;

        for (let i = 0; i < waitingOrderDetails.length; i++) {
            if (waitingOrderDetails[i].Id == obj.id) {
                this.setState({ ...waitingOrderDetails[i] = _.set({ ...waitingOrderDetails[i] }, 'IsFinish', changeCheckBoxValue) });
                await this.props.setFinishOrderDetail(obj.id, obj.check);
                this.props.getWaitingOrders();
                this.props.getWaitingOrdersDetail();
            }
        }

    };

    CompleteOrder = async (obj) => {
        let result = window.confirm("Are you sure this order is completed ?");
        if (result) {
            const success = await this.props.setCompleteOrder(obj);
            if (success) {
                const data = this.state.waitingOrders.filter(function (el) { return el.Id != obj.Id; });
                this.setState({ waitingOrders: data });
            }
        }
    }

    render() {
        const { searchText, setSearchText, categoryFilter, setCategoryFilter } = this.props;
        const { waitingOrders, waitingOrderDetails } = this.state;
        return (
            <div className="w-full">

                <div className="mx-auto px-8 sm:px-16 py-24">
                    <div className="flex flex-col sm:flex-row items-center justify-between py-24">
                        <TextField
                            label="Search for a order"
                            placeholder="Enter a keyword..."
                            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                            value={searchText}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={setSearchText}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                            <InputLabel htmlFor="category-label-placeholder">
                                Processing
                            </InputLabel>
                            <Select
                                value={categoryFilter}
                                onChange={setCategoryFilter}
                                input={
                                    <OutlinedInput
                                        labelWidth={("category".length * 9)}
                                        name="category"
                                        id="category-label-placeholder"
                                    />
                                }
                            >
                                <MenuItem value="all">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value='Waiting order'>Waiting</MenuItem>
                                <MenuItem value='Preparing order'>Preparing</MenuItem>
                                <MenuItem value='Add Order More'>Order More</MenuItem>

                            </Select>
                        </FormControl>
                    </div>
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        className="flex flex-wrap py-24"
                    >
                        {waitingOrders.length === 0 && (
                            <div className="flex flex-1 items-center justify-center">
                                <Typography color="textSecondary" className="text-24 my-24">
                                    No orders found!
                                </Typography>
                            </div>
                        )}

                        {waitingOrders.map((item, index) => {
                            const totalFood = waitingOrderDetails.filter(f => f.PlacedOrderId == item.Id)
                                .reduce(function (acc, val) {
                                    return acc + val.Quantity;
                                }, 0);
                            const totalFinishFood = waitingOrderDetails.filter(f => f.PlacedOrderId == item.Id &&
                                f.IsFinish == 1)
                                .reduce(function (acc, val) {
                                    return acc + val.Quantity;
                                }, 0);
                            return (
                                <div className="w-full pb-24 sm:w-1/2 lg:w-1/4 sm:p-16" key={index}>
                                    <Card elevation={1} className="flex flex-col">
                                        <div
                                            className={`${item.OrderProcessIdColor} flex flex-no-shrink items-center justify-between px-24 h-64`}
                                        >
                                            <Typography className="font-medium truncate" color="inherit">{item.OrderProcessIdName}</Typography>
                                            <div className="flex items-center justify-center opacity-75">
                                                <Icon className="text-20 mr-8" color="inherit">access_time</Icon>
                                                <div className="text-16 whitespace-no-wrap">{Filter.svcTimeSince(item.OrderTime)}</div>
                                            </div>
                                        </div>
                                        <CardContent className="flex flex-col flex-auto items-center justify-center">
                                            <Typography className="text-center text-16 font-bold">Order {item.Code.substring(item.Code.length - 4)}</Typography>
                                            {this.getOrderDetailByOrder(item.Id)}
                                        </CardContent>
                                        <Divider />
                                        <CardActions className="justify-center">
                                            <Button
                                                disabled={totalFinishFood == totalFood ? false : true}
                                                className="justify-start px-32"
                                                color="secondary"
                                                onClick={event => this.CompleteOrder(item)}
                                            >
                                                {this.buttonStatus(totalFinishFood == totalFood)}
                                            </Button>
                                        </CardActions>
                                        <LinearProgress
                                            className="w-full"
                                            variant="determinate"
                                            value={totalFinishFood * 100 / totalFood}
                                            color="secondary"
                                        />
                                    </Card>
                                </div>
                            )
                        })}
                    </FuseAnimateGroup>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getWaitingOrders: Actions.getWaitingOrders,
        getWaitingOrdersDetail: Actions.getWaitingOrdersDetail,
        setFinishOrderDetail: Actions.setFinishOrderDetail,
        setCompleteOrder: Actions.setCompleteOrder,
        setCategoryFilter: Actions.setCategoryFilter,
        setSearchText: Actions.setOrdersSearchText
    }, dispatch);
}

function mapStateToProps({ order }) {
    return {
        waitingOrders: order.waitingOrder.waitingOrder,
        waitingOrderDetails: order.waitingOrder.waitingOrderDetail,
        searchText: order.waitingOrder.searchText,
        categoryFilter: order.waitingOrder.categoryFilter
    }
}

export default withReducer('order', reducer)(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(WaitingOrders)));
