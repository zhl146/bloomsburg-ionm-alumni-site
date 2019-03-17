import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { addPermissionMap } from '../../util/user'

export const GET_USER_PROFILES = gql`
    query {
        users {
            userId
            email
            title
            blurb
            nameFirst
            nameLast
            phone
            locationCity
            locationState
            locationZip
            pictureSmall
            pictureMedium
            pictureLarge
            twitter
            facebook
            linkedin

            permissions {
                permissionId
            }
        }
    }
`
class UsersProvider extends React.Component {
    render() {
        return (
            <Query query={GET_USER_PROFILES}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>
                    if (error) return <div>Error :(</div>

                    const mappedUsers = data.users.map(user =>
                        addPermissionMap(user)
                    )

                    return this.props.render(mappedUsers)
                }}
            </Query>
        )
    }
}

export default UsersProvider
