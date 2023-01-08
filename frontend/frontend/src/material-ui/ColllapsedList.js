import Collapse from "@mui/material/Collapse";
import { List } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DarkTheme from "./DarkTheme";
import { ThemeProvider } from "@mui/material";
import { yellow } from "@mui/material/colors";

const CollapsedList = (props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const listElements = props.elements.map((track, index) => (
    <ListItem key={index} color="#f5f5f5">
      <ListItemText primary={track} color="#f5f5f5" />{" "}
    </ListItem>
  ));

  return (
    <ThemeProvider theme={DarkTheme}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        bgcolor={yellow}
      >
        <ListItem onClick={handleClick} color="primary">
          <ListItemText primary={props.title} color="primary" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit color="#f5f5f5">
          <List component="div" disablePadding color="#f5f5f5">
            {listElements}
          </List>
        </Collapse>
      </List>
    </ThemeProvider>
  );
};

export default CollapsedList;
