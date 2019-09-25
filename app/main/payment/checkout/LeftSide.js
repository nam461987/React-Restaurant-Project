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
    Card
} from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';
import Filter from 'app/main/shared/functions/filters';

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
        width: '300px',
        marginTop: 24,
        overflowX: 'auto',
    },
    table: {
        maxWidth: '100%'
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

class LeftSide extends Component {

    componentDidUpdate(prevProps, prevState) {
        // const oldValue = cloneDeep(this.props.orders);
        // if (!_.isEqual(this.props.orders, this.state.orders)) {
        //     this.setState({ orders: oldValue })
        //     this.sumFunction();
        // }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={`${classes.root} flex flex-1 relative overflow-hidden`}>
                <Card>

                </Card>
            </Paper>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage
    }, dispatch);
}

function mapStateToProps({ auth, order }) {
    return {
    }
}

export default (withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSide))));