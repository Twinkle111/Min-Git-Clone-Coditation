import { Button, Divider } from "@material-ui/core";
import React from "react";
import SimpleCard from "./SimpleCard";

export default function RepoDashboard(props) {
  return (
    <div>
      <h2>Repository Dashboard</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={(value) => props.showRepoDetails(false)}
      >
        Back To Repo Listing
      </Button>
      <Divider variant="inset" component="li" />
      <SimpleCard keyy="Commits" value={props.commitCount} />

      <Divider variant="inset" component="li" />
      <SimpleCard keyy="Forks" value={props.forkCount} />
      <Divider variant="inset" component="li" />

      <SimpleCard keyy="Issues" value={props.issueCount} />
      <Divider variant="inset" component="li" />
    </div>
  );
}
