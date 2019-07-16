import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import classNames from 'classnames';

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class ComponentTableHead extends React.Component {
    state = {
        selectedItemsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedItemsMenu = (event) => {
        this.setState({ selectedItemsMenu: event.currentTarget });
    };

    closeSelectedItemsMenu = () => {
        this.setState({ selectedItemsMenu: null });
    };

    setStatus = (data) => {
        const { rowCount, curPage } = this.props;
        for (let i = 0; i < data.length; i++) {
            this.props.setStatus(data[i], curPage, rowCount);
        }
        this.props.onSelectedChange();
        this.closeSelectedItemsMenu();
    }

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes, obj, selected, user } = this.props;
        const { selectedItemsMenu } = this.state;

        return (
            <TableHead>
                <TableRow className="h-64">
                    <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                        {numSelected > 0 && (
                            <div className={classNames("flex items-center justify-center absolute w-64 pin-t pin-l ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                                <IconButton
                                    aria-owns={selectedItemsMenu ? 'selectedItemsMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedItemsMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedItemsMenu"
                                    anchorEl={selectedItemsMenu}
                                    open={Boolean(selectedItemsMenu)}
                                    onClose={this.closeSelectedItemsMenu}
                                >
                                    <MenuList>
                                        {user.permissions.includes(obj.deletePermission) ?
                                            <MenuItem
                                                onClick={() => {
                                                    this.setStatus(selected);
                                                }}
                                            >
                                                <ListItemIcon className={classes.icon}>
                                                    <Icon>block</Icon>
                                                </ListItemIcon>
                                                <ListItemText inset primary="Active/ Deactive" />
                                            </MenuItem> : null
                                        }
                                    </MenuList>
                                </Menu>
                            </div>
                        )}
                    </TableCell>
                    {obj.fields.filter(row => row.list).map(row => {
                        return (
                            <TableCell
                                key={row.label}
                                align={row.align}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.field ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.field}
                                            direction={order}
                                            onClick={this.createSortHandler(row.field)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, null)(ComponentTableHead));
