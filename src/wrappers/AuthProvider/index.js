import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { path } from 'ramda'

import { setSession } from './actions'

import { isAuthenticated } from '../../Auth'

class AuthProvider extends React.Component {
    render() {
        const { token, profile, expiresAt, setSession } = this.props
        const loggedIn = isAuthenticated(expiresAt)
        return this.props.render({
            token,
            profile,
            loggedIn,
            setSession,
        })
    }
}

const mapStateToProps = state => ({
    token: path(['auth', 'idToken'], state),
    profile: path(['auth', 'profile'], state),
    expiresAt: path(['auth', 'expiresAt'], state),
})

const mapDispatchToProps = {
    setSession,
}

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)

export default enhance(AuthProvider)
