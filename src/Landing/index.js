import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Typography, TextField, Fade, Avatar } from "@material-ui/core";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";

import AuthProvider from "../wrappers/AuthProvider";
import { VerSpacer, HorSpacer } from "../util/spacer";

class Landing extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AuthProvider
        render={({ logIn }) => (
          <div className={classes.root}>
            <Fade in timeout={2000}>
              <div className={classes.loginCard}>
                <Avatar color="secondary">BU</Avatar>
                <VerSpacer size={10} />
                <Typography variant="h6" color="inherit">
                  Welcome Alumni!
                </Typography>
                <TextField
                  id="outlined-email-input"
                  label="Email"
                  inputProps={{
                    classes: {
                      input: classes.nativeInput
                    }
                  }}
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <VerSpacer size={10} />
                <Button
                  onClick={logIn}
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Log In
                </Button>
                <VerSpacer size={10} />
                <div className={classes.requestAccessContainer}>
                  <Typography color="inherit">Need an account?</Typography>
                  <HorSpacer size={10} />
                  <Typography color="primary">Request Access</Typography>
                </div>
              </div>
            </Fade>
          </div>
        )}
      />
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to right, #89253e, #3a6186)"
  },
  loginCard: {
    background: "white",
    width: 250,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  nativeInput: {
    color: "white",
    background: "white"
  },
  requestAccessContainer: {
    display: "flex",
    justifyContent: "center"
  },
  textField: {
    color: "white"
  }
});

const enhance = compose(withStyles(styles));

export default enhance(Landing);
