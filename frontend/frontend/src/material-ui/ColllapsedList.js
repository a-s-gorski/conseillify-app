import Collapse from "@mui/material/Collapse";
import { List } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import React, { useState }  from "react";
import  { ExpandLess, ExpandMore } from "@mui/icons-material";
const CollapsedList =(props) => {
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen(!open);
    };
  
    const listElements = props.elements.map((track, index) =>
    <ListItem key={index}><ListItemText primary={track}/> </ListItem>)
  
    return (
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem onClick={handleClick}>
          <ListItemText primary={props.title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {listElements}
          </List>
        </Collapse>
      </List>
    );
  }

  export default CollapsedList;