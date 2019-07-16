import React, { Component } from 'react';
import { withStyles, Card, CardContent, Icon, Typography } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import AxiosConfig from 'app/shared/globals/axios/AxiosConfigs';
import Constants from 'app/shared/constants/constants';

const styles = theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    }
});

class ActiveAccountPage extends Component {
    state = {
        status: null
    };

    componentDidMount() {
        this.handleActiveToken();
    }

    handleActiveToken = () => {
        const params = this.props.match.params;
        const { token } = params;
        if (token) {
            const request = AxiosConfig.get(Constants.API_ACCOUNT.accountActive, {
                params: {
                    Token: token
                }
            });
            request.then((response) => {
                this.setState({ status: response.data })
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { status } = this.state;
        if (status == 1) {
            return (
                <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                    <div className="flex flex-col items-center justify-center w-full">

                        <FuseAnimate animation="transition.expandIn">

                            <Card className="w-full max-w-384">

                                <CardContent className="flex flex-col items-center justify-center p-32">

                                    <div className="m-32">
                                        <Icon className="text-green text-96" color="action">check_circle_outline</Icon>
                                    </div>

                                    <Typography variant="h5" className="text-center mb-16">Activated!</Typography>

                                    <Typography className="text-center mb-16 w-full" color="textSecondary">
                                        Your account has been activated.
                                    </Typography>

                                    <Typography className="text-center w-full" color="textSecondary">
                                        You can login to the application from now on.
                                    </Typography>

                                    <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                        <Link className="font-medium" to="/login">Go back to login</Link>
                                    </div>

                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            );
        }
        else if (status == null || status == 0) {
            return (
                <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                    <div className="flex flex-col items-center justify-center w-full">

                        <FuseAnimate animation="transition.expandIn">

                            <Card className="w-full max-w-384">

                                <CardContent className="flex flex-col items-center justify-center p-32">

                                    <div className="m-32">
                                        <Icon className="text-red text-96" color="action">highlight_off</Icon>
                                    </div>

                                    <Typography variant="h5" className="text-center mb-16">Failed!</Typography>

                                    <Typography className="text-center mb-16 w-full" color="textSecondary">
                                        Your token is invalid or an error has occurred.
                                    </Typography>

                                    <Typography className="text-center w-full" color="textSecondary">
                                        Please try again later or contact system admin.
                                    </Typography>

                                    <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                        <Link className="font-medium" to="/login">Go back to login</Link>
                                    </div>

                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            );
        }
        else if (status == 2) {
            return (
                <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                    <div className="flex flex-col items-center justify-center w-full">

                        <FuseAnimate animation="transition.expandIn">

                            <Card className="w-full max-w-384">

                                <CardContent className="flex flex-col items-center justify-center p-32">

                                    <div className="m-32">
                                        <Icon className="text-orange text-96" color="action">done_all</Icon>
                                    </div>

                                    <Typography variant="h5" className="text-center mb-16">Your account has been Activated!</Typography>

                                    <Typography className="text-center mb-16 w-full" color="textSecondary">
                                        You activated your account before. You do not need to do it again.
                                    </Typography>

                                    <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                        <Link className="font-medium" to="/login">Go back to login</Link>
                                    </div>

                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            );
        }
        else if (status == 3) {
            return (
                <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                    <div className="flex flex-col items-center justify-center w-full">

                        <FuseAnimate animation="transition.expandIn">

                            <Card className="w-full max-w-384">

                                <CardContent className="flex flex-col items-center justify-center p-32">

                                    <div className="m-32">
                                        <Icon className="text-96" color="action">timer_off</Icon>
                                    </div>

                                    <Typography variant="h5" className="text-center mb-16">The token was expired!</Typography>

                                    <Typography className="text-center mb-16 w-full" color="textSecondary">
                                        The account activation link is out of date, please contact the admin to provide a new account activation link.
                                    </Typography>

                                    <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                        <Link className="font-medium" to="/login">Go back to login</Link>
                                    </div>

                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            );
        }
    }
}

export default withStyles(styles, { withTheme: true })(ActiveAccountPage);
