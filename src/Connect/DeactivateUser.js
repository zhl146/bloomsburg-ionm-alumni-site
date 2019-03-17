import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'

import { CurrentUserContext } from '../ContextProvider/CurrentUserProvider'
import { hasAnyPermissions } from '../util/user'
import { GET_USER_PROFILES } from '../wrappers/UsersProvider'

export const DEACTIVATE_USER = gql`
    mutation removeRolesFromUser($userId: ID!) {
        removeRolesFromUser(userId: $userId, roleIds: ["basicUser"])
    }
`

class ActivateUser extends Component {
    static contextType = CurrentUserContext

    render() {
        const { profile } = this.props
        const currentUser = this.context

        const shouldShow =
            hasAnyPermissions(['userDeactivate'], currentUser) &&
            hasAnyPermissions(['viewSite'], profile) &&
            profile.userId !== currentUser.userId

        return (
            shouldShow && (
                <Mutation mutation={DEACTIVATE_USER}>
                    {(deactivateUser, { data, loading, error }) => {
                        return (
                            <Button
                                disabled={loading || Boolean(data)}
                                onClick={() =>
                                    deactivateUser({
                                        refetchQueries: [
                                            {
                                                query: GET_USER_PROFILES,
                                            },
                                        ],
                                        variables: { userId: profile.userId },
                                    })
                                }
                            >
                                Deactivate
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
