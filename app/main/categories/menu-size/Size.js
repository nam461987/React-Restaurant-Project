import React, { Component } from 'react';
import {
    withStyles,
    Button,
    TextField,
    Icon,
    Typography,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    IconButton
} from '@material-ui/core';
import { FuseAnimate, FusePageCarded, FuseChipSelect } from '@fuse';
import { orange } from '@material-ui/core/colors';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import * as SharedActions from 'app/main/shared/options/store/actions';
import SharedReducer from 'app/main/shared/options/store/reducers';
import obj from './configs/config';
import { showMessage } from 'app/store/actions/fuse';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Upload from 'app/main/shared/functions/uploads';
import Constants from 'app/shared/constants/constants';

const styles = theme => ({
    componentImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    componentImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            boxShadow: theme.shadows[5],
            '& $componentImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $componentImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $componentImageFeaturedStar': {
                opacity: 1
            }
        }
    },
    button: {
        margin: 8,
    },
    input: {
        display: 'none',
    },
    textField: {
        width: '80%'
    }
});

class Size extends Component {

    state = {
        form: null,
        isNew: false,
        file: null
    };

    componentDidMount() {
        for (var i = 0; i < obj.fields.length; i++) {
            if ((obj.fields[i].type == "select" || obj.fields[i].type == "select2") && !obj.fields[i].depend) {
                if (!this.props.options.options['options_' + obj.fields[i].field + '_array']
                    && !this.props.options.options['options_' + obj.fields[i].field + '_' + obj.fields[i].option]) {
                    this.props.getOptionsByKey(obj.fields[i].field, obj.fields[i].option);
                }
            }
        }
        this.updateSizeState();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.updateSizeState();
        }

        if (
            (this.props.size.data && !this.state.form) ||
            (this.props.size.data && this.state.form && this.props.size.data.Id !== this.state.form.Id)
        ) {
            this.updateFormState();
        }
    };

    updateFormState = () => {
        const { size } = this.props;
        // auto get depend option list in update item mode
        for (var i = 0; i < obj.fields.length; i++) {
            if (obj.fields[i].depend) {
                if (!this.props.options.options['options_' + obj.fields[i].field + '_array']
                    && !this.props.options.options['options_' + obj.fields[i].field + '_' + obj.fields[i].option]){
                        this.props.getOptionsByDependId(obj.fields[i].field, obj.fields[i].option, size.data[obj.fields[i].depend] );
                    }
            }
        }
        this.setState({ form: this.props.size.data })
    };

    updateSizeState = () => {
        const { history, user } = this.props;
        const params = this.props.match.params;
        const { id } = params;
        if (id === 'new') {
            if (!user.permissions.includes(obj.addNewPermission)) {
                history.push({
                    pathname: Constants.PAGE.DENY_PAGE
                });
            }
            this.props.size.added = false;
            this.props.newSize();
            this.setState({ isNew: true })
        }
        else {
            if (!user.permissions.includes(obj.updatePermission)) {
                history.push({
                    pathname: Constants.PAGE.DENY_PAGE
                });
            }
            this.props.getSize(id);
        }
    };

    handleChange = (event) => {
        this.setState({ form: _.set({ ...this.state.form }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value) });
    };

    handleChipChange = (value, name) => {
        for (var i = 0; i < obj.fields.length; i++) {
            if (name == obj.fields[i].depend) {
                this.props.getOptionsByDependId(obj.fields[i].field, obj.fields[i].option, value.value);
            }
        }
        this.setState({ form: _.set({ ...this.state.form }, name, value.value) });
    };

    canBeSubmitted() {
        if (this.state.isNew) {
            return this.checkRequiredFields() && !this.props.size.added &&
                !_.isEqual(this.props.size.data, this.state.form)
        }
        return (this.checkRequiredFields() &&
            !_.isEqual(this.props.size.data, this.state.form)) || this.state.file != null
    };
    checkRequiredFields = () => {
        let result = false;

        for (let i = 0; i < obj.fields.length; i++) {
            if (obj.fields[i].required) {
                if (this.state.form[obj.fields[i].field] != null &&
                    this.state.form[obj.fields[i].field].toString().length > 0) {
                    result = true;
                }
                else {
                    result = false;
                    break;
                }
            }
        }

        return result;
    }
    handleCheck = (event, obj) => {
        const { form } = this.state;

        let changeCheckBoxValue = obj.check == 1 ? 0 : 1;

        this.setState({ form: _.set({ ...this.state.form }, obj.field, changeCheckBoxValue) });
    };
    handleUploadChange = (e, field) => {
        this.setState({ file: _.set({ ...this.state.file }, field, e.target.files[0]) })
    };
    fileUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return Upload(formData);
    };
    uploadImage = async () => {
        for (var k in this.state.file) {
            if (typeof this.state.file[k] !== 'function') {
                await this.fileUpload(this.state.file[k]).then((response) => {
                    this.setState({ ...this.state.form[k] = response.data }, function () {
                        delete this.state.file[k];
                    })
                })
            }
        }
        this.setState({ file: null })
    }
    submit = async () => {
        const { saveSize, addSize } = this.props;
        const { form } = this.state;
        if (this.state.file != null) {
            await this.uploadImage();
        }
        this.state.isNew ? addSize(form) : saveSize(form);
    }

    render() {
        const { classes, saveSize, addSize } = this.props;
        const { form } = this.state;
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to={obj.baseRoute}>
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        {obj.appName}
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        {form.images != null && form.images.length > 0 ? (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, { id: form.featuredImageId }).url} alt={form.name} />
                                        ) : (
                                                <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name} />
                                            )}
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form[obj.urlName] ? form[obj.urlName] : 'New ' + obj.appName}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">{obj.appName} Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={this.submit}
                                >
                                    Save
                                </Button>

                            </FuseAnimate>
                        </div>
                    )
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            <div>
                                {obj.fields.filter(f => this.state.isNew ? f.create : f.edit).map(f => {
                                    switch (f.type) {
                                        case "hidden":
                                            {
                                                return (
                                                    <TextField
                                                        key={f.field}
                                                        className="mt-8 mb-16"
                                                        error={form[f.field] === ''}
                                                        required={f.required ? true : false}
                                                        label={f.label}
                                                        id={f.field}
                                                        name={f.field}
                                                        value={form[f.field] || ''}
                                                        onChange={this.handleChange}
                                                        variant="outlined"
                                                        InputProps={{
                                                            readOnly: this.state.isNew ? false : f.readOnly,
                                                        }}
                                                        fullWidth
                                                        hidden
                                                    />
                                                )
                                            }
                                        case "date":
                                            {
                                                return (
                                                    <TextField
                                                        key={f.field}
                                                        id={f.field}
                                                        name={f.field}
                                                        value={form[f.field] || '2017-05-24'}
                                                        required={f.required ? true : false}
                                                        label={f.label}
                                                        type="date"
                                                        className="mt-8 mb-16"
                                                        onChange={this.handleChange}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        InputProps={{
                                                            readOnly: this.state.isNew ? false : f.readOnly,
                                                        }}
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )
                                            }
                                        case "time":
                                            {
                                                return (
                                                    <TextField
                                                        key={f.field}
                                                        id={f.field}
                                                        name={f.field}
                                                        value={form[f.field] || '07:30'}
                                                        required={f.required ? true : false}
                                                        label={f.label}
                                                        type="time"
                                                        className="mt-8 mb-16"
                                                        onChange={this.handleChange}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        inputProps={{
                                                            step: 300, // 5 min
                                                            readOnly: this.state.isNew ? false : f.readOnly,
                                                        }}
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )
                                            }
                                        case "datetime":
                                            {
                                                return (
                                                    <TextField
                                                        key={f.field}
                                                        id={f.field}
                                                        name={f.field}
                                                        value={form[f.field] || '2017-05-24T10:30'}
                                                        required={f.required ? true : false}
                                                        label={f.label}
                                                        type="datetime-local"
                                                        className="mt-8 mb-16"
                                                        onChange={this.handleChange}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        InputProps={{
                                                            readOnly: this.state.isNew ? false : f.readOnly,
                                                        }}
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )
                                            }
                                        case "password":
                                            {
                                                return (
                                                    <TextField
                                                        key={f.field}
                                                        className="mt-8 mb-16"
                                                        error={f.required ? form[f.field] === '' : false}
                                                        required={f.required ? true : false}
                                                        label={f.label}
                                                        type="password"
                                                        id={f.field}
                                                        name={f.field}
                                                        value={form[f.field] || ''}
                                                        onChange={this.handleChange}
                                                        variant="outlined"
                                                        InputProps={{
                                                            readOnly: this.state.isNew ? false : f.readOnly,
                                                        }}
                                                        fullWidth
                                                    />
                                                )
                                            }
                                        case "textarea":
                                            {
                                                return (
                                                    <TextField
                                                        key={f.field}
                                                        className="mt-8 mb-16"
                                                        id={f.field}
                                                        name={f.field}
                                                        onChange={this.handleChange}
                                                        label={f.label}
                                                        type="text"
                                                        value={form[f.field] || ''}
                                                        multiline
                                                        rows={5}
                                                        variant="outlined"
                                                        InputProps={{
                                                            readOnly: this.state.isNew ? false : f.readOnly,
                                                        }}
                                                        fullWidth
                                                    />
                                                )
                                            }
                                        case "select":
                                        case "select2":
                                            {
                                                //check if admin right or Restaurant owner. Don't need to pick Type and Branch
                                                if (form.TypeId && (form.TypeId == 1 || form.TypeId == 2 || form.TypeId == 3) &&
                                                    (f.field == 'BranchId' || f.field == 'TypeId' || f.field == 'RestaurantId')) {
                                                    return;
                                                }
                                                const options = typeof f.option == "object" ?
                                                    this.props.options.options['options_' + f.field + '_array'] ? this.props.options.options['options_' + f.field + '_array'].map(o => ({ value: o.Value, label: o.DisplayText })) : []
                                                    : this.props.options.options['options_' + f.field + '_' + f.option] ? this.props.options.options['options_' + f.field + '_' + f.option].map(o => ({ value: o.Value, label: o.DisplayText })) : []
                                                return (
                                                    <FuseChipSelect
                                                        key={f.field}
                                                        id={f.field}
                                                        name={f.field}
                                                        className="w-full my-16"
                                                        value={form[f.field] ? options.filter(o => o.value == form[f.field]) : { value: '', label: 'Select ' + f.label }}
                                                        onChange={(value) => this.handleChipChange(value, f.field)}
                                                        placeholder={"Select " + f.label}
                                                        textFieldProps={{
                                                            label: f.label,
                                                            InputLabelProps: {
                                                                shrink: true
                                                            },
                                                            variant: 'outlined'
                                                        }}
                                                        required={f.required ? true : false}
                                                        options={options}
                                                        fullWidth
                                                    />
                                                )
                                            }
                                        case "checkbox":
                                            {
                                                return (
                                                    <FormControl component="fieldset" key={f.field}>
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={<Checkbox checked={form[f.field] == 1}
                                                                    onChange={event => this.handleCheck(event, { field: f.field, check: form[f.field] })} value={`${form[f.field]}`} />}
                                                                label={f.label}
                                                            />
                                                        </FormGroup>
                                                    </FormControl>
                                                )
                                            }
                                        case "upload":
                                            {
                                                let imagePreview = null;
                                                if (form[f.field]) {
                                                    imagePreview = (<img className='w-64 m-4' src={form[f.field]} />);
                                                }
                                                return (
                                                    <div key={f.field}>
                                                        <TextField
                                                            id={f.field}
                                                            name={f.field}
                                                            value={form[f.field] || ''}
                                                            required={f.required ? form[f.field] === '' : false}
                                                            label={f.label}
                                                            type="text"
                                                            className={`${classes.textField} mt-8 mb-16`}
                                                            onChange={this.handleChange}
                                                            inputProps={{
                                                                readOnly: this.state.isNew ? false : f.readOnly,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <input accept="image/*" className={classes.input}
                                                            onChange={event => this.handleUploadChange(event, f.field)} multiple id="icon-button-file" type="file" />
                                                        <label htmlFor="icon-button-file">
                                                            <IconButton
                                                                color="primary"
                                                                aria-label="Upload picture"
                                                                className={classes.button}
                                                                component="span"
                                                            >
                                                                <PhotoCamera fontSize="large" />
                                                            </IconButton>
                                                        </label>
                                                        {imagePreview}
                                                    </div>
                                                )
                                            }
                                        default:
                                            {
                                                return (
                                                    <TextField
                                                        key={f.field}
                                                        className="mt-8 mb-16"
                                                        error={f.required ? form[f.field] === '' : false}
                                                        required={f.required ? true : false}
                                                        label={f.label}
                                                        autoFocus={f.autoFocus ? f.autoFocus : false}
                                                        placeholder={f.placeHolder ? f.placeHolder : ""}
                                                        id={f.field}
                                                        name={f.field}
                                                        value={form[f.field] || ''}
                                                        onChange={this.handleChange}
                                                        variant="outlined"
                                                        InputProps={{
                                                            readOnly: this.state.isNew ? false : f.readOnly
                                                        }}
                                                        fullWidth
                                                    />
                                                )
                                            }
                                    }
                                })}
                            </div>
                        </div>
                    )
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage: showMessage,
        getSize: Actions.getSize,
        newSize: Actions.newSize,
        addSize: Actions.addSize,
        saveSize: Actions.saveSize,
        getOptionsByKey: SharedActions.getOptionsByKey,
        getOptionsByDependId: SharedActions.getOptionsByDependId
    }, dispatch);
}

function mapStateToProps({ category, options, auth }) {
    return {
        size: category.size,
        options: options,
        user: auth.user
    }
}

export default withReducer('options', SharedReducer)(withReducer('category', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(Size)))));
