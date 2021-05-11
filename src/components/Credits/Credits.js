import React, { useState } from "react";
import FacebookShare from "../FacebookShare/FacebookShare";

import MoodIcon from "@material-ui/icons/Mood";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";

import {
  Link,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  ListSubheader,
} from "@material-ui/core";

const creditsList = [
  {
    name: "Pikk7",
    urls: [
      { name: "Instagram", URL: "https://www.instagram.hu/pikkhet" },
      {
        name: "Facebook",
        URL: "https://www.facebook.com/migmir13/",
      },
      { name: "Github", URL: "https://github.com/pikk7" },
    ],
  },
  { name: "Nóra", urls: [] },
];

export default function Credits() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <h1 style={{ color: "white" }}>Credits</h1>
          </ListSubheader>
        }
      >
        {creditsList.map((element, i) => {
          return (
            <div key={i}>
              <ListItem key={i} button onClick={() => handleClick()}>
                <ListItemIcon>
                  <MoodIcon />
                </ListItemIcon>
                <ListItemText primary={element.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {element.urls && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {element.urls.map((e, index) => {
                    return (
                      <List key={index} component="div" disablePadding>
                        <ListItem key={index} button>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <Link href={e.URL}>{e.name}</Link>
                        </ListItem>
                      </List>
                    );
                  })}
                </Collapse>
              )}
            </div>
          );
        })}{" "}
      </List>
      <br></br>
      Share the fun wit others!!!
      <FacebookShare />
    </>
  );
}
