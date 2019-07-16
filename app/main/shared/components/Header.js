import React, { Component } from 'react';
import { Paper, Button, Input, Icon, Typography, MuiThemeProvider } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SharedActions from './store/actions';

class ComponentHeader extends Component {
    componentDidMount() {
        this.props.clearSearchText();
    }
    render() {
        const { setSearchText, searchText, mainTheme, obj, user, headersearch } = this.props;
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-0 sm:mr-12">{obj.icon}</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="hidden sm:flex" variant="h6">{obj.appName}</Typography>
                    </FuseAnimate>
                </div>
                {headersearch != null && !headersearch ? null :
                    <div className="flex flex-1 items-center justify-center px-12">

                        <MuiThemeProvider theme={mainTheme}>
                            <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                                    <Icon className="mr-8" color="action">search</Icon>

                                    <Input
                                        placeholder="Search"
                                        className="flex flex-1"
                                        disableUnderline
                                        fullWidth
                                        value={searchText}
                                        inputProps={{
                                            'aria-label': 'Search'
                                        }}
                                        onChange={setSearchText}
                                    />
                                </Paper>
                            </FuseAnimate>
                        </MuiThemeProvider>

                    </div>
                }
                {user.permissions.includes(obj.addNewPermission) ?
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                        <Button component={Link} to={obj.baseRoute + "new"} className="whitespace-no-wrap" variant="contained">
                            <span className="hidden sm:flex">Add New {obj.appName}</span>
                            <span className="flex sm:hidden">New</span>
                        </Button>
                    </FuseAnimate> : null}

            </div>
        );
    }

};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSearchText: SharedActions.setItemsSearchText,
        clearSearchText: SharedActions.clearItemsSearchText
    }, dispatch);
}

function mapStateToProps({ fuse, SharedReducers, auth }) {
    return {
        searchText: SharedReducers.searchText.searchText,
        mainTheme: fuse.settings.mainTheme,
        user: auth.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentHeader);
