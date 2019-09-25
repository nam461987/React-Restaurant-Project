import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import {
    withStyles,
    IconButton,
    Icon,
    Hidden,
    Fab,
    Typography
} from '@material-ui/core';
import _ from '@lodash';
import { FusePageSimple, FuseAnimate } from '@fuse';
import withReducer from 'app/store/withReducer';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import { showMessage } from 'app/store/actions/fuse';
import Constants from 'app/shared/constants/constants';

const styles = theme => ({
    layoutRoot: {
        minHeight: "100vh"
    },
    sidebar: {
        position: 'absolute',
        '&.permanent': {
            [theme.breakpoints.up('lg')]: {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                position: 'relative'
            }
        },
        width: '70%',
        height: '100%'
    },
    margin: {
        margin: 8,
    },
    extendedIcon: {
        marginRight: 8,
    }
});

class Checkout extends Component {
    state = {

    };

    componentDidMount() {
    };

    componentDidUpdate(prevProps, prevState) {
        // if (!_.isEqual(this.props.orders, prevProps.orders)) {
        //     this.setState({ orders: this.props.orders })
        // }
        // if (!_.isEqual(this.props.order, prevProps.order)) {
        //     this.setState({ order: this.props.order })
        // }
    }

    handlePaymentClick = () => {
        return null;
    }

    render() {
        const { classes } = this.props;
        const { } = this.state;
        return (
            <div>
                <FusePageSimple
                    classes={{
                        root: classes.layoutRoot,
                        rightSidebar: "md:w-640 xl:w-640",
                        staticWidth: classes.sidebar,
                        header: "min-h-72 flex flex-wrap content-center flex-row",
                        sidebarHeader: "min-h-72 flex flex-wrap content-center flex-row"
                    }}
                    header={
                        <React.Fragment>

                            <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                                <Hidden lgUp>
                                    <div className="flex items-center justify-end">
                                        <FuseAnimate animation="transition.expandIn" delay={200}>
                                            <IconButton onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                                aria-label="open right sidebar">
                                                <Icon>menu</Icon>
                                            </IconButton>
                                        </FuseAnimate>
                                    </div>
                                </Hidden>
                            </div>


                        </React.Fragment>
                    }
                    content={
                        <LeftSide />
                    }
                    rightSidebarHeader={
                        <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                            <div className="flex items-center justify-end">
                                <Fab
                                    variant="extended"
                                    size="medium"
                                    aria-label="Add"
                                    className="bg-blue-dark text-white mr-8"
                                    onClick={event => this.handlePaymentClick()}
                                >
                                    <Icon className={classes.extendedIcon}>print</Icon>
                                    Re-Print Bill
                            </Fab>
                                <Fab
                                    variant="extended"
                                    size="medium"
                                    aria-label="Add"
                                    className="bg-green text-white"
                                >
                                    <Icon className={classes.extendedIcon}>payment</Icon>
                                    Payment
                            </Fab>
                            </div>
                        </div>
                    }
                    rightSidebarContent={
                        <RightSide />
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage
    }, dispatch);
}

function mapStateToProps({ order }) {
    return {
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout)));
