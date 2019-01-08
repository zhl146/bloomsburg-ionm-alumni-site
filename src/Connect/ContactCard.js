import React, { Component } from "react";
import { Card, Avatar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import classnames from "classnames";

import { capFirst } from "../util/stringfns";

class ContactCard extends Component {
  render() {
    const { profile, classes } = this.props;
    const { name, picture, location, email, cell } = profile;
    return (
      <Card className={classes.root}>
        <div className={classes.avatarContainer}>
          <Avatar
            alt="user"
            src={picture.medium}
            className={classes.userAvatar}
          />
        </div>
        <div className={classes.nameContainer}>
          <Typography variant="h6">{`${capFirst(name.first)} ${capFirst(
            name.last
          )}`}</Typography>
          <Typography variant="body1">Job Title</Typography>
        </div>
        <div className={classes.infoContainer}>
          <Typography>{`${location.city}, ${location.state}`}</Typography>
          <Typography>{cell}</Typography>
          <Typography>{email}</Typography>
        </div>
        <div
          style={{
            gridArea: "fbook",
            color: "#4867AA"
          }}
        >
          <i
            className={classnames("fab fa-facebook-square", classes.socialIcon)}
          />
        </div>
        <div
          style={{
            gridArea: "linkIn",
            color: "#0274B3"
          }}
        >
          <i className={classnames("fab fa-linkedin", classes.socialIcon)} />
        </div>
        <div
          style={{
            gridArea: "twitter",
            color: "#1DA1F2"
          }}
        >
          <i
            className={classnames("fab fa-twitter-square", classes.socialIcon)}
          />
        </div>
      </Card>
    );
  }
}

const styles = {
  root: {
    height: 225,
    width: 500,
    margin: 12,
    display: "grid",
    gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
    gridTemplateRows: "1.25 1fr",
    gridTemplateAreas: `
      'photo info info info'
      'name fbook linkIn twitter'
    `
  },
  socialIcon: {
    height: "100%",
    width: "100%",
    fontSize: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  nameContainer: {
    gridArea: "name",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  infoContainer: {
    gridArea: "info",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 36
  },
  infoRow: {
    display: "flex"
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gridArea: "photo"
  },
  userAvatar: {
    width: 90,
    height: 90
  }
};

const enhance = compose(withStyles(styles));

export default enhance(ContactCard);
