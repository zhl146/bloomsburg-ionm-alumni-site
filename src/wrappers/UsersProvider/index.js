import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { logIn, logOut } from "./actions";

class UsersProvider extends Component {
  componentDidMount() {}

  render() {
    const { loggedIn, logIn, logOut } = this.props;
    return this.props.render({ loggedIn, logIn, logOut });
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
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

export default enhance(UsersProvider);
