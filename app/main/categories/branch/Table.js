import React, { Component } from 'react';
import { Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox } from '@material-ui/core';
import { FuseScrollbars } from '@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import slugify from 'slugify';
import ComponentTableHead from 'app/main/shared/components/TableHead';
import * as Actions from '../store/actions';
import Filter from 'app/main/shared/functions/filters';

class ComponentTable extends Component {

    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.Items,
        page: 0,
        rowsPerPage: 10
    };

    componentDidMount() {
        this.props.getBranchs(this.state.page, this.state.rowsPerPage);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.Items.Items, prevProps.Items.Items) || !_.isEqual(this.props.searchText, prevProps.searchText)
            || !_.isEqual(this.props.page, prevProps.page)) {
            const data = this.getFilteredArray(this.props.Items, this.props.searchText);
            this.setState({ data })
        }
    }

    getFilteredArray = (data, searchText) => {
        const newData = { ...data };
        const listObj = this.props.obj.fields.filter(f => f.list);
        if (searchText.length === 0) {
            return newData;
        }
        newData.Items = _.filter(newData.Items, item => {
            for (var i = 0; i < listObj.length; i++) {
                if (item[listObj[i].field] != null &&
                    item[listObj[i].field].toString().toLowerCase().includes(searchText.toString().toLowerCase())) {
                    return true;
                }
            }
        });
        return newData;
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };
    handleSelectedChange = () => {
        this.setState({ selected: [] })
    }
    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: this.state.data.Items.map(n => ({ id: n.Id, status: n.Status })) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (item, route) => {
        this.props.history.push(route + item.Id + '/' + slugify(item[this.props.obj.urlName], { replacement: '-', remove: null, lower: true }));
    };

    handleCheck = (event, obj) => {
        const { selected } = this.state;
        const selectedIndex = selected.findIndex(x => x.id === obj.id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, obj);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.props.getBranchs(page, this.state.rowsPerPage);
        this.setState({ page, selected: [] });
    };

    handleChangeRowsPerPage = event => {
        this.props.getBranchs(0, event.target.value);
        this.setState({ rowsPerPage: event.target.value, selected: [] });
    };

    isSelected = obj => this.state.selected.findIndex(x => x.id === obj.id) !== -1;

    render() {
        const { obj, setStatus } = this.props;
        const { order, orderBy, selected, rowsPerPage, page, data } = this.state;
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ComponentTableHead
                            selected={selected}
                            setStatus={setStatus}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onSelectedChange={this.handleSelectedChange}
                            onRequestSort={this.handleRequestSort}
                            rowCount={rowsPerPage}
                            curPage={page}
                            obj={obj}
                        />

                        <TableBody>
                            {_.orderBy(data.Items, [
                                (o) => {
                                    switch (orderBy) {
                                        case 'categories':
                                            {
                                                return o.categories[0];
                                            }
                                        default:
                                            {
                                                return o[orderBy];
                                            }
                                    }
                                }
                            ], [order])
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected({ id: n.Id, status: n.Status });

                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.Id}
                                            selected={isSelected}
                                            onClick={event => this.handleClick(n, obj.baseRoute)}
                                        >
                                            <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => event.stopPropagation()}
                                                    onChange={event => this.handleCheck(event, { id: n.Id, status: n.Status })}
                                                />
                                            </TableCell>

                                            {obj.fields.filter(f => f.list).map(function (f) {
                                                return (
                                                    Object.keys(n).map((c, index) => {
                                                        if ((f.type == 'select' || f.type == 'select2' ? f.field + f.view : f.field) == c) {
                                                            switch (f.type) {
                                                                case "date":
                                                                    {
                                                                        return (
                                                                            <TableCell key={index} component="th" scope="row" align={f.align}>
                                                                                {Filter.svcDate(n[c], obj)}
                                                                            </TableCell>
                                                                        )
                                                                    }
                                                                case "datetime":
                                                                    {
                                                                        return (
                                                                            <TableCell key={index} component="th" scope="row" align={f.align}>
                                                                                {Filter.svcDateTime(n[c], obj)}
                                                                            </TableCell>
                                                                        )
                                                                    }
                                                                case "select":
                                                                case "select2":
                                                                    {
                                                                        return (
                                                                            <TableCell key={index} className="w-52" component="th" scope="row" padding="none">
                                                                                {n[c]}
                                                                            </TableCell>
                                                                        )
                                                                    }
                                                                case "money":
                                                                    {
                                                                        return (
                                                                            <TableCell key={index} component="th" scope="row" align={f.align}>
                                                                                {Filter.svcMoney(n[c])}
                                                                            </TableCell>
                                                                        )
                                                                    }
                                                                case "upload":
                                                                    {
                                                                        return (
                                                                            <TableCell key={index} className="w-52" component="th" scope="row" padding="none">
                                                                                {Filter.svcImage(n[c])}
                                                                            </TableCell>
                                                                        )
                                                                    }
                                                                case "textarea":
                                                                    {
                                                                        return (
                                                                            <TableCell key={index} className="w-52" component="th" scope="row" padding="none">
                                                                                <div>{n[c]}</div>
                                                                            </TableCell>
                                                                        )
                                                                    }
                                                                case "active":
                                                                case "checkbox":
                                                                    {
                                                                        return (
                                                                            <TableCell key={index} component="th" scope="row" align={f.align}>
                                                                                {Filter.svcActive(n[c])}
                                                                            </TableCell>
                                                                        )
                                                                    }
                                                                default:
                                                                    {
                                                                        return (
                                                                            <TableCell key={index} component="th" scope="row" align={f.align}>
                                                                                {n[c]}
                                                                            </TableCell>
                                                                        )
                                                                    }
                                                            }
                                                        };
                                                    })
                                                )
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data.TotalItems != null ? data.TotalItems : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBranchs: Actions.getBranchs,
        setStatus: Actions.setBranchStatus
    }, dispatch);
}

function mapStateToProps({ category, SharedReducers }) {
    return {
        Items: category.branchs.data,
        searchText: SharedReducers.searchText.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentTable));
