import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Typography,
    TextField,
    Fade,
    Avatar,
    Card,
} from '@material-ui/core'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'

import { requestLink } from './index'
import { VerSpacer, HorSpacer } from '../util/spacer'

class Landing extends Component {
    state = {
        email: '',
        submitted: false,
    }

    inputOnChange = e => {
        this.setState({ email: e.target.value })
    }

    submitEmail = () => {
        requestLink(this.state.email)
        this.setState({ submitted: true })
    }

    render() {
        const { classes } = this.props
        const { email, submitted } = this.state

        return (
            <div className={classes.root}>
                <Fade in timeout={2000}>
                    <Card className={classes.loginCard}>
                        <Avatar color="secondary">BU</Avatar>
                        <VerSpacer size={10} />
                        <Typography variant="h6">Welcome Alumni!</Typography>
                        {submitted ? (
                            <Typography>{`We just sent an e-mail to ${email}, please check it for your magic log-in link!`}</Typography>
                        ) : (
                            <Fragment>
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={this.inputOnChange}
                                />
                                <VerSpacer size={10} />
                                <Button
                                    onClick={this.submitEmail}
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                >
                                    Log In
                                </Button>
                                <VerSpacer size={10} />
                                <div className={classes.requestAccessContainer}>
                                    <Typography>Need an account?</Typography>
                                    <HorSpacer size={10} />
                                    <Typography color="secondary">
                                        Request Access
                                    </Typography>
                                </div>
                            </Fragment>
                        )}
                    </Card>
                </Fade>
            </div>
        )
    }
}

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right, #89253e, #3a6186)',
    },
    loginCard: {
        width: 300,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    requestAccessContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
})

const enhance = compose(withStyles(styles))

export default enhance(Landing)
