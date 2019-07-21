import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { withStyles } from '@material-ui/core';
import _ from '@lodash';
import { FusePageSimple } from '@fuse';
import withReducer from 'app/store/withReducer';
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import reducer from './store/reducers';

const styles = theme => ({
    layoutRoot: {}
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

    bothSideUpdated = () =>{
        this.setState({ orders: this.props.orders })
    }

    render() {
        const { classes } = this.props;
        const { orders } = this.state;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                content={
                    <div className="p-24">
                        <div className="md:flex w-full">
                            <div className="flex flex-col flex-1 md:pr-32">
                                <LeftSide refresh={this.bothSideUpdated} />
                            </div>
                            <div className="flex flex-col lg:w-320 xl:w-640 md:w-320">
                                <RightSide data={{orders}} refresh={this.bothSideUpdated} />
                            </div>
                        </div>
                    </div>
                }
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
