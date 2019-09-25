import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Link } from 'react-router-dom';

class DenyPage extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.go(-2)
    }

    render() {
        return (
            <div className="flex flex-col flex-1 items-center justify-center p-16">

                <div className="max-w-512 text-center">

                    <FuseAnimate animation="transition.expandIn" delay={100}>
                        <Typography variant="h1" color="inherit" className="font-medium mb-16">
                            Access Deny
                    </Typography>
                    </FuseAnimate>

                    <FuseAnimate delay={500}>
                        <Typography variant="h5" color="textSecondary" className="mb-16">
                            Sorry but you do not have permission on the page you have entered.
                    </Typography>
                    </FuseAnimate>
                    {/* <Button size="small" onClick={this.goBack} className="mb-16">Go back to previous page</Button> */}
                    <a href="javascript:;" className="font-medium" onClick={this.goBack}>Go back to previous page</a>
                </div>
            </div>
        );
    }
}

export default DenyPage;