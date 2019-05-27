import React, { Component } from 'react'
import { Card, Avatar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'

import { formatLocation, formatName, formatTitle } from '../util/stringFormat'
import Facebook from './Facebook'
import Linkedin from './Linkedin'
import Twitter from './Twitter'

class ContactCard extends Component {
    render() {
        const { profile, classes } = this.props
        const {
            userId,
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
            avatarType,
        } = profile
        return (
            <Card className={classes.root}>
                <div className={classes.avatarContainer}>
                    <Avatar
                        alt="user"
                        src={`https://avatars.dicebear.com/v2/${avatarType}/${userId}.svg`}
                        className={classes.userAvatar}
                    />
                </div>
                <div className={classes.nameContainer}>
                    <Typography variant="h6">
                        {formatName(nameFirst, nameLast)}
                    </Typography>
                    <Typography variant="body1">
                        {formatTitle(title)}
                    </Typography>
                </div>
                <div className={classes.infoContainer}>
                    <Typography>
                        {formatLocation(
                            locationCity,
                            locationState,
                            locationZip
                        )}
                    </Typography>
                    <Typography>{phone}</Typography>
                    <Typography>{email}</Typography>
                </div>
                <div
                    style={{
                        gridArea: 'fbook',
                    }}
                >
                    <Facebook handle={facebook} />
                </div>
                <div
                    style={{
                        gridArea: 'linkIn',
                    }}
                >
                    <Linkedin handle={linkedin} />
                </div>
                <div
                    style={{
                        gridArea: 'twitter',
                    }}
                >
                    <Twitter handle={twitter} />
                </div>
            </Card>
        )
    }
}

const styles = {
    root: {
        height: 225,
        width: 500,
        margin: 12,
        display: 'grid',
        gridTemplateColumns: '2.5fr 1fr 1fr 1fr',
        gridTemplateRows: '1.25 1fr',
        gridTemplateAreas: `
      'photo info info info'
      'name fbook linkIn twitter'
    `,
    },
    socialIcon: {
        height: '100%',
        width: '100%',
        fontSize: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    facebookIcon: {
        color: '#4867AA',
    },
    twitterIcon: {
        color: '#1DA1F2',
    },
    linkedinIcon: {
        color: '#0274B3',
    },
    nameContainer: {
        gridArea: 'name',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    infoContainer: {
        gridArea: 'info',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 36,
    },
    infoRow: {
        display: 'flex',
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gridArea: 'photo',
    },
    userAvatar: {
        width: 90,
        height: 90,
    },
}

const enhance = compose(withStyles(styles))

export default enhance(ContactCard)
