import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";

export default function Header(props) {
  const displayDesktop = () => {
    return (
      <Toolbar
        variant="dense"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {props.text}
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}
