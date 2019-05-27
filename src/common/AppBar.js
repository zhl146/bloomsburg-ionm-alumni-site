import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Toolbar, AppBar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { signOut, isAuthenticated } from '../Auth'

function SimpleAppBar(props) {
    const { classes, children } = props

    const loggedIn = isAuthenticated()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar classes={{ root: classes.toolbar }}>
                    <div className={classes.logoContainer}>
                        <i
                            className={classnames('fas fa-brain', classes.logo)}
                        />
                        <Typography color="inherit" variant="h6">
                            IONM Alumni
                        </Typography>
                        {children}
                    </div>

                    <div className={classes.btnContainer}>
                        {/* <IconButton component={Link} to="/work" color="inherit">
                            <Work />
                        </IconButton> */}
                        <Button component={Link} to="/connect" color="inherit">
                            Contacts
                        </Button>
                        <Button component={Link} to="/profile" color="inherit">
                            Profile
                        </Button>
                        {loggedIn && (
                            <Button onClick={signOut} color="inherit">
                                Log Out
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 16px',
        margin: 0,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        margin: '0px 12px',
        fontSize: 24,
    },
    btnContainer: {
        fontSize: 12,
    },
    activeTab: {
        color: theme.palette.secondary[600],
    },
})

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleAppBar)
