import React, { Component } from "react";
import AppBar from "../common/AppBar";
import UsersProvider from "../wrappers/UsersProvider";

import ContactCard from "./ContactCard";

class Connect extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar />
        <UsersProvider
          render={({ userProfiles }) => (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                background: "#F5F8F9",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              {userProfiles.map((profile, index) => (
                <ContactCard key={index} profile={profile} />
              ))}
            </div>
          )}
        />
      </div>
    );
  }
}

export default Connect;
