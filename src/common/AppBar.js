import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Toolbar, AppBar } from "@material-ui/core";
import { Work, Contacts } from "@material-ui/icons";
import { Link } from "react-router-dom";

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar classes={{ root: classes.toolbar }}>
          <div className={classes.logoContainer}>
            <i className={classnames("fas fa-brain", classes.logo)} />
            <Typography color="inherit" variant="h6">
              IONM Alumni
            </Typography>
          </div>

          <div>
            <IconButton component={Link} to="/work" color="inherit">
              <Work />
            </IconButton>
            <IconButton component={Link} to="/connect" color="inherit">
              <Contacts />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const styles = {
  root: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    margin: 0
  },
  logoContainer: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    margin: "0px 12px",
    fontSize: 24
  }
};

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
