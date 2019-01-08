import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { path, isEmpty } from "ramda";

import { updateUsers } from "./actions";

class UsersProvider extends React.Component {
  componentDidMount() {
    if (isEmpty(this.props.userProfiles)) this.props.updateUsers();
  }

  render() {
    const { updateUsers, userProfiles } = this.props;
    return this.props.render({ updateUsers, userProfiles });
  }
}

const mapStateToProps = state => ({
  userProfiles: path(["user", "userProfiles"], state)
});

const mapDispatchToProps = dispatch => ({
  updateUsers: () => dispatch(updateUsers)
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(UsersProvider);
