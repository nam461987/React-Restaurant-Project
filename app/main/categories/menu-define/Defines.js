import React, { Component } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import ComponentTable from './Table';
import ComponentHeader from 'app/main/shared/components/Header';
import reducer from '../store/reducers';
import SharedReducers from 'app/main/shared/components/store/reducers';
import obj from './configs/config';


class Defines extends Component {
    render() {
        const { menuid, sizeid } = this.props.match.params;
        obj.baseRoute = "/categories/menu-defines/" + menuid + "/" + sizeid + "/";
        return (
            <FusePageCarded
                classes={{
                    content: "flex",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <ComponentHeader obj={obj} />
                }
                content={
                    <ComponentTable obj={obj} />
                }
                innerScroll
            />
        );
    }
};

export default withReducer('SharedReducers', SharedReducers)(withReducer('category', reducer)(Defines));
