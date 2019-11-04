import React, { Component, Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

class Layout extends Component {
    render () {
        return (
            <Fragment>
                <CssBaseline />
                {/* <Container maxWidth="false"> */}
                    {this.props.children}
                {/* </Container> */}
            </Fragment>
        )
    }
}

export default Layout;