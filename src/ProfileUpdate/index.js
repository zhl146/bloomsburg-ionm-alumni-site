import React, { Component } from 'react'

import AppBar from '../common/AppBar'
import UserProfileProvider from '../wrappers/UserProfileProvider'
import ProfileUpdate from './ProfileUpdate'

class ProfileContainer extends Component {
    render() {
        return (
            <div>
                <AppBar />
                <UserProfileProvider
                    render={currentUserProfile => (
                        <ProfileUpdate profile={currentUserProfile} />
                    )}
                />
            </div>
        )
    }
}

export default ProfileContainer
