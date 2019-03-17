import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import { handleAuthentication, isAuthenticated } from '.'

class Callback extends Component {
    state = {
        loading: false,
        loginFailed: false,
    }

    async componentDidMount() {
        if (this.props.location.hash) {
            this.setState({
                loading: true,
            })
            handleAuthentication(this.props.location.hash)
                .then(
                    authResult => {},
                    err => {
                        this.setState({ loginFailed: true })
                    }
                )
                .finally(() =>
                    this.setState({
                        loading: false,
                    })
                )
        }
    }

    render() {
        const { loading, loginFailed } = this.state
        const loggedIn = isAuthenticated()
        return loginFailed ? (
            <Typography>Login Failed</Typography>
        ) : loading ? (
            <Typography>Logging In</Typography>
        ) : loggedIn ? (
            <Redirect to="/" />
        ) : (
            <Typography>Something went wrong</Typography>
        )
    }
}

export default withRouter(Callback)
