import React from "react";

export const VerSpacer = ({ size }) => (
  <div
    style={{
      height: size,
      width: "100%"
    }}
  />
);

export const HorSpacer = ({ size }) => (
  <div
    style={{
      height: "100%",
      width: size
    }}
  />
);
