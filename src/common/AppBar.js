import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  InputBase
} from "@material-ui/core";
import { Work, Contacts, Search } from "@material-ui/icons";
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
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

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 16px",
    margin: 0
  },
  logoContainer: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    margin: "0px 12px",
    fontSize: 24
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
