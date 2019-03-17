import React, { Component } from 'react'
import { Avatar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import classnames from 'classnames'

import { capFirst } from '../util/stringfns'

class VerticalProfile extends Component {
    render() {
        const { profile, classes } = this.props
        const {
            email,
            title,
            blurb,
            nameFirst,
            nameLast,
            phone,
            locationCity,
            locationState,
            locationZip,
            pictureSmall,
            pictureMedium,
            pictureLarge,
            twitter,
            facebook,
            linkedin,
        } = profile
        return (
            <div className={classes.root}>
                <Avatar
                    alt="user"
                    src={pictureMedium}
                    className={classes.userAvatar}
                >
                    {!pictureMedium &&
                        `${nameFirst ? nameFirst[0] : ''}${
                            nameLast ? nameLast[0] : ''
                        }`.toUpperCase()}
                </Avatar>
                <Typography variant="h6">{`${capFirst(nameFirst)} ${capFirst(
                    nameLast
                )}`}</Typography>
                <Typography variant="body1">
                    {title || 'Awesome Person'}
                </Typography>
                <Typography>{`${locationCity}, ${locationState}`}</Typography>
                <Typography>{phone}</Typography>
                <Typography>{email}</Typography>
                <div
                    style={{
                        gridArea: 'fbook',
                        color: '#4867AA',
                    }}
                >
                    <i
                        className={classnames(
                            'fab fa-facebook-square',
                            classes.socialIcon
                        )}
                    />
                    {facebook}
                </div>
                <div
                    style={{
                        gridArea: 'linkIn',
                        color: '#0274B3',
                    }}
                >
                    <i
                        className={classnames(
                            'fab fa-linkedin',
                            classes.socialIcon
                        )}
                    />
                    {linkedin}
                </div>
                <div
                    style={{
                        gridArea: 'twitter',
                        color: '#1DA1F2',
                    }}
                >
                    <i
                        className={classnames(
                            'fab fa-twitter-square',
                            classes.socialIcon
                        )}
                    />
                    {twitter}
                </div>
            </div>
        )
    }
}

const styles = {
    root: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    userAvatar: {
        width: 180,
        height: 180,
        fontSize: 48,
    },
    socialIcon: {
        height: '100%',
        width: '100%',
        fontSize: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

const enhance = compose(withStyles(styles))

export default enhance(VerticalProfile)
