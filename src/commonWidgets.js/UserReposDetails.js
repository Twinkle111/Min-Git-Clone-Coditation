import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import { isUndefinedOrNull } from "../utils/StringValidator";
import { Button } from "@material-ui/core";
import { getReposListing } from "../utils/RestUtilCalls";
import RepoDashboard from "./RepoDashboard";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import StarsIcon from "@material-ui/icons/Stars";
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

export class UserReposDetails extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      showRepoDetails: false,
      commitCount: "NA",
      forkCount: "NA",
      issueCount: "NA",
    };
    this.selectedRepoName = "";
  }

  componentDidMount() {
    getReposListing(
      this.props.selectedUserData.repos_url,
      this.repoSearchSuccess,
      this.repoSearchFail
    );
  }

  repoSearchSuccess = (value) => {
    let newObj = {};
    if (!isUndefinedOrNull(value)) {
      value.forEach((element) => {
        newObj[element.name] = element;
      });
    }
    this.setState({ userDetails: newObj });
  };

  repoSearchFail(value) {}

  onRepoNameClick = (event) => {
    let repoName = event.target.getAttribute("id");
    this.selectedRepoName = repoName;
    let ownerName = this.props.selectedUserData.login;
    let url =
      "https://api.github.com/repos/" + ownerName + "/" + repoName + "/commits";
    getReposListing(url, this.repoDataSuccess, this.repoDataFail);
  };

  repoDataSuccess = (value) => {
    let forks = this.state.userDetails[this.selectedRepoName].forks_count;
    let issues = this.state.userDetails[this.selectedRepoName]
      .open_issues_count;

    this.setState({
      showRepoDetails: true,
      commitCount: value.length,
      forkCount: forks,
      issueCount: issues,
    });
  };

  getList = () => {
    let userDetails = this.state.userDetails;
    if (isUndefinedOrNull(userDetails)) {
      userDetails = {};
    }

    let userListItems = Object.entries(userDetails).map((entry) => {
      let key = entry[0];
      let value = entry[1];
      return (
        <div>
          {this.getListItems(
            key,
            value.name,
            value.stargazers_count,
            value.description
          )}
          <Divider variant="inset" component="li" />
        </div>
      );
    });

    return <List className={classes.root}>{userListItems}</List>;
  };

  getListItems = (key, name, star, description) => {
    return (
      <ListItem key={key} alignItems="flex-start">
        <ListItemText
          primary={
            <Link id={key} onClick={this.onRepoNameClick}>
              {name}
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
                <StarsIcon />
                Stars: {star}
                <PersonOutlineIcon />
              </Typography>
              {"  " + description}
            </React.Fragment>
          }
        />
      </ListItem>
    );
  };

  showRepoDetails = (show) => {
    this.setState({ showRepoDetails: show });
  };

  render() {
    return (
      <div>
        {this.state.showRepoDetails ? (
          <RepoDashboard
            showRepoDetails={this.showRepoDetails}
            commitCount={this.state.commitCount}
            forkCount={this.state.forkCount}
            issueCount={this.state.issueCount}
          />
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={(value) => this.props.showUserDetails(false)}
            >
              Back To User Listing
            </Button>
            <h2>{this.props.selectedUserData.login}'s Repositories List</h2>
            <h1>{this.getList()}</h1>
          </div>
        )}
      </div>
    );
  }
}

export default UserReposDetails;
