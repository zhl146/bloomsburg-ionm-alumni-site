import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { path } from "ramda";

import { logIn, logOut } from "./actions";

class AuthProvider extends React.Component {
  render() {
    const { loggedIn, logIn, logOut } = this.props;
    return this.props.render({ loggedIn, logIn, logOut });
  }
}

const mapStateToProps = state => ({
  loggedIn: path(["auth", "loggedIn"], state)
});

const mapDispatchToProps = {
  logIn,
  logOut
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(AuthProvider);
