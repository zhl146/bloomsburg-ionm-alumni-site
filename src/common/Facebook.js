import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import classnames from 'classnames'

import { formatSocialLink } from '../util/stringFormat'

class Twitter extends Component {
    render() {
        const { handle, classes } = this.props
        return (
            <a
                className={classes.undecoratedLink}
                href={formatSocialLink('https://www.facebook.com/', handle)}
            >
                <i
                    className={classnames(
                        'fab fa-facebook-square',
                        classes.socialIcon,
                        handle ? classes.facebookIcon : classes.disabled
                    )}
                />
            </a>
        )
    }
}

const styles = {
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
    disabled: {
        color: 'grey',
    },
    undecoratedLink: {
        textDecoration: 'none',
    },
}

const enhance = compose(withStyles(styles))

export default enhance(Twitter)
