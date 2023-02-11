import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";

export default function Header(props) {
  const displayDesktop = () => {
    return <Toolbar>{props.text}</Toolbar>;
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}
