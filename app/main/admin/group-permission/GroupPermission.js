import React, { Component } from 'react';
import {
    withStyles,
    Icon,
    Typography,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Checkbox,
    Button
} from '@material-ui/core';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import withReducer from 'app/store/withReducer';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import { showMessage } from 'app/store/actions/fuse';
import Constants from 'app/shared/constants/constants';

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
    },
    button: {
        margin: 8,
      },
      leftIcon: {
        marginRight: 8,
      },
      rightIcon: {
        marginLeft: 8,
      },
      iconSmall: {
        fontSize: 20,
      },
});

class Courses extends Component {

    state = {
        groups: this.props.groups,
        modules: this.props.modules,
        permissions: [],
        permissionChangeList: [],
        type: 0,
        module: ''
    };

    componentDidMount() {
        this.props.getGroup();
        this.props.getModule();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.groups, prevProps.groups)) {
            const groups = this.props.groups;
            this.setState({ groups })
        }
        if (!_.isEqual(this.props.modules, prevProps.modules)) {
            const modules = this.props.modules;
            this.setState({ modules })
        }
        if (!_.isEqual(this.props.permissions, prevProps.permissions)) {
            const permissions = this.props.permissions;
            this.setState({ permissions,permissionChangeList:[] })
        }
    }

    handleTypeChange = (event) => {
        this.loadPermission(event.target.value, this.state.module);
        this.setState({ type: event.target.value })
    }
    handleModuleChange = (event) => {
        this.loadPermission(this.state.type, event.target.value);
        this.setState({ module: event.target.value })
    }
    loadPermission = (groupId, Module) => {
        if ((groupId && groupId > 0) && (Module && Module.length > 0)) {
            this.props.getPermission(groupId, Module);
            this.setState({ permissions: this.props.permissions });
        }
    }
    
    handleCheck = (event, obj) => {
        const { permissionChangeList ,permissions} = this.state;

        const selectedIndex = permissionChangeList.findIndex(x => x.id === obj.id);
        const changedIndex = permissions.findIndex(x => x.Id === obj.id);
        //change status before insert to array
        obj.status = obj.status==1 ? 0 : 1;
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(permissionChangeList, obj);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(permissionChangeList.slice(1));
        }
        else if (selectedIndex === permissionChangeList.length - 1) {
            newSelected = newSelected.concat(permissionChangeList.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                permissionChangeList.slice(0, selectedIndex),
                permissionChangeList.slice(selectedIndex + 1)
            );
        }

        this.setState({ permissionChangeList: newSelected, ...permissions[changedIndex].Status = obj.status });
    };

    handleSave =()=>{
        const { permissionChangeList } = this.state;
        for (let i=0;i<permissionChangeList.length;i++){
            this.props.updateGroupPermission(permissionChangeList[i].group,permissionChangeList[i].id,permissionChangeList[i].status);
            if( i == permissionChangeList.length - 1 ){
                this.props.showMessage({ message: Constants.MODAL.SAVE_DATA_SUCCESS, variant: Constants.VARIANT.SUCCESS });
                this.setState({ permissionChangeList: [] });
            }
        }
    }

    render() {
        const { classes } = this.props;

        const { type, groups, modules, permissions, permissionChangeList } = this.state;
        return (
            <div className="w-full">

                <div className={classNames(classes.header, "relative overflow-hidden flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")}>

                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Typography color="inherit" className="text-24 sm:text-40 font-light">
                            SET USER RIGHT
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate duration={400} delay={600}>
                        <Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
                            <span className="opacity-75">
                                You can set account permission by group. The users can not do anything they don't have permit.
                            </span>
                        </Typography>
                    </FuseAnimate>

                    {permissionChangeList.length > 0 ?
                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Button color="secondary" className="whitespace-no-wrap mt-8 sm:mt-16" variant="contained" onClick={this.handleSave}>
                            <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)+' hidden sm:flex'} />
                            <span className="hidden sm:flex">Save changes</span>
                            <span className="flex sm:hidden">Save</span>
                        </Button>
                    </FuseAnimate> : null}

                    <Icon className={classes.headerIcon}>school</Icon>
                </div>

                <div className="max-w-2xl w-full mx-auto px-8 sm:px-8 py-24">
                    <div className="flex flex-col sm:flex-row justify-between py-24">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Group</FormLabel>
                            <RadioGroup
                                aria-label="Group"
                                name="group"
                                value={type}
                                onChange={this.handleTypeChange}
                            >
                                {groups.map((group, index) => {
                                    return (
                                        <FormControlLabel key={index} value={`${group.Id}`} control={<Radio />} label={group.Name} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Module</FormLabel>
                            <RadioGroup
                                aria-label="Module"
                                name="module"
                                value={this.state.module}
                                onChange={this.handleModuleChange}
                            >
                                {modules.map((m, index) => {
                                    return (
                                        <FormControlLabel key={index} value={m.Value} control={<Radio />} label={m.DisplayText} />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Permissions</FormLabel>
                            <FormGroup>
                                {permissions.map((p,index) => {
                                    const isSelected = p.Status == 1;

                                    return (
                                        <FormControlLabel key={index}
                                            control={<Checkbox checked={isSelected}
                                                onChange={event => this.handleCheck(event, { id: p.Id, group: type, status: p.Status })} value={`${p.Status}`} />}
                                            label={p.Description}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </FormControl>
                    </div>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        getGroup: Actions.getGroupForGroupPermission,
        getModule: Actions.getModuleForGroupPermission,
        getPermission: Actions.getPermissionForGroupPermission,
        updateGroupPermission: Actions.updateGroupPermission
    }, dispatch);
}

function mapStateToProps({ admin }) {
    return {
        groups: admin.grouppermission.groups,
        modules: admin.grouppermission.modules,
        permissions: admin.grouppermission.permissions
    }
}

export default withReducer('admin', reducer)(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Courses)));
