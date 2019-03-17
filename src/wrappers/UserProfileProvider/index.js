import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import { addPermissionMap } from '../../util/user'

export const GET_CURRENT_USER_PROFILE = gql`
    query {
        currentUser {
            userId
            title
            blurb
            email
            nameLast
            nameFirst
            phone
            locationCity
            locationState
            locationZip
            twitter
            facebook
            linkedin

            permissions {
                permissionId
            }
        }
    }
`

class UserProfileProvider extends React.Component {
    render() {
        return (
            <Query query={GET_CURRENT_USER_PROFILE}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>

                    return data && data.currentUser
                        ? this.props.render(addPermissionMap(data.currentUser))
                        : this.props.render()
                }}
            </Query>
        )
    }
}

export default UserProfileProvider
