import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import {
    withStyles,
    IconButton,
    Icon,
    Hidden,
    Fab
} from '@material-ui/core';
import _ from '@lodash';
import { FusePageSimple, FuseAnimate } from '@fuse';
import withReducer from 'app/store/withReducer';
import NavigationIcon from '@material-ui/icons/Navigation';
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import reducer from './store/reducers';

const styles = theme => ({
    layoutRoot: {},
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

class SimpleFullWidthSample extends Component {
    state = {
        orders: this.props.orders
    };

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.orders, prevProps.orders)) {
            this.setState({ orders: this.props.orders })
        }
    }

    bothSideUpdated = () => {
        this.setState({ orders: this.props.orders })
    }

    render() {
        const { classes } = this.props;
        const { orders } = this.state;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot,
                    rightSidebar: "md:w-640 xl:w-640",
                    staticWidth: classes.sidebar,
                    header: "h-72 min-h-72",
                    sidebarHeader: "h-72 min-h-72"
                }}
                header={
                    <Hidden lgUp>
                        <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                            <div className="flex items-center justify-end">
                                <FuseAnimate animation="transition.expandIn" delay={200}>
                                    <IconButton onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                        aria-label="open right sidebar">
                                        <Icon>menu</Icon>
                                    </IconButton>
                                </FuseAnimate>
                            </div>
                        </div>
                    </Hidden>
                }
                content={
                    <LeftSide refresh={this.bothSideUpdated} />
                }
                rightSidebarHeader={
                    <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                        <div className="flex items-center justify-end">
                            <Fab
                                variant="extended"
                                size="medium"
                                color="secondary"
                                aria-label="Add"
                            >
                                <NavigationIcon className={classes.extendedIcon} />
                                Send Orders
                            </Fab>
                        </div>
                    </div>
                }
                rightSidebarContent={
                    <RightSide data={{ orders }} refresh={this.bothSideUpdated} />
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
                innerScroll
            />
        )
    }
}

function mapStateToProps({ order }) {
    return {
        orders: order.orders.orders
    }
}

export default (withReducer('order', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, null)(SimpleFullWidthSample)))));
