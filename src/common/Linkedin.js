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
                href={formatSocialLink('https://www.linkedin.com/in/', handle)}
            >
                <i
                    className={classnames(
                        'fab fa-linkedin',
                        classes.socialIcon,
                        handle ? classes.linkedinIcon : classes.disabled
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
    linkedinIcon: {
        color: '#0274B3',
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
