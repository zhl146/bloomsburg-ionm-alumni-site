import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import AuthProvider from '../wrappers/AuthProvider'
import CurrentUserProvider from '../ContextProvider/CurrentUserProvider'

class ProtectedRoute extends Component {
    render() {
        return (
            <AuthProvider
                render={({ loggedIn }) =>
                    loggedIn ? (
                        <CurrentUserProvider>
                            {this.props.children}
                        </CurrentUserProvider>
                    ) : (
                        <Redirect to="/login" />
                    )
                }
            />
        )
    }
}

export default ProtectedRoute
