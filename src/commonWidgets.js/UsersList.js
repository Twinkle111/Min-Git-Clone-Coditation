import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import { isUndefinedOrNull } from "../utils/StringValidator";

const classes = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export class UsersList extends Component {
  constructor(props) {
    super(props);

    this.handleSearchIconClick = this.onUserNameClick.bind(this);
    this.getListItems = this.getListItems.bind(this);
  }

  onUserNameClick = (event) => {
    let key = event.target.getAttribute("id");
    this.props.setSelectedUserData(this.props.userList[key]);
    this.props.showUserDetails(true);
  };

  getList = () => {
    let usersList = this.props.userList;
    if (isUndefinedOrNull(usersList)) {
      usersList = {};
    }

    let userListItems = Object.entries(usersList).map((entry) => {
      let key = entry[0];
      let value = entry[1];
      return (
        <div>
          {this.getListItems(
            key,
            value.avatar_url,
            "NodeId: " + value.node_id,
            "To see details please click on the name link"
          )}
          <Divider variant="inset" component="li" />
        </div>
      );
    });

    return (
      <List className={classes.root}>
        {userListItems.length > 0 ? <h2>User List</h2> : ""}
        {userListItems}
      </List>
    );
  };

  getListItems(key, avatar, value3, value4) {
    return (
      <ListItem key={key} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link id={key} onClick={this.onUserNameClick}>
              {key}
            </Link>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {value3}
              </Typography>
              {value4}
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }

  render() {
    return this.getList();
  }
}
