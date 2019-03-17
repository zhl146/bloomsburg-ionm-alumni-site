import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'

import { CurrentUserContext } from '../ContextProvider/CurrentUserProvider'
import { hasAnyPermissions, hasNoPermissions } from '../util/user'
import { GET_USER_PROFILES } from '../wrappers/UsersProvider'

export const ACTIVATE_USER = gql`
    mutation addRolesToUser($userId: ID!) {
        addRolesToUser(userId: $userId, roleIds: ["basicUser"])
    }
`

class ActivateUser extends Component {
    static contextType = CurrentUserContext

    render() {
        const { profile } = this.props
        const currentUser = this.context

        const shouldShow =
            hasAnyPermissions(['userActivate'], currentUser) &&
            hasNoPermissions(['viewSite'], profile) &&
            profile.userId !== currentUser.userId

        return (
            shouldShow && (
                <Mutation mutation={ACTIVATE_USER}>
                    {(activateUser, { data, loading, error }) => {
                        return (
                            <Button
                                disabled={loading || Boolean(data)}
                                onClick={() =>
                                    activateUser({
                                        refetchQueries: [
                                            {
                                                query: GET_USER_PROFILES,
                                            },
                                        ],
                                        variables: { userId: profile.userId },
                                    })
                                }
                            >
                                Activate
                            </Button>
                        )
                    }}
                </Mutation>
            )
        )
    }
}

const styles = {}

export default withStyles(styles)(ActivateUser)
