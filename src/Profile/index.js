import React, { Component } from 'react'
import {
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import AppBar from '../common/AppBar'
import UserProfileProvider from '../wrappers/UserProfileProvider'
import VerticalProfile from '../common/VerticalProfile'

class ProfileContainer extends Component {
    render() {
        return (
            <div>
                <AppBar />
                <UserProfileProvider
                    render={currentUserProfile => (
                        <Card>
                            <CardContent>
                                <VerticalProfile profile={currentUserProfile} />
                            </CardContent>
                            <CardActionArea>
                                <CardActions>
                                    <Button component={Link} to="/profile/edit">
                                        EDIT
                                    </Button>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    )}
                />
            </div>
        )
    }
}

export default ProfileContainer
