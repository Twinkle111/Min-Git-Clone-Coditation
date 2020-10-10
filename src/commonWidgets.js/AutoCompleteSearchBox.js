import React, { PureComponent } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getUserList } from "../utils/RestUtilCalls";

export class AutoCompleteSearchBox extends PureComponent {
  constructor() {
    super();
    this.state = {
      userList: [],
    };
    this.success = this.success.bind(this);
  }

  componentDidMount() {
    getUserList(this.success, this.fail);
  }

  fail(value) {
    console.log(value);
  }

  success(value) {
    this.setState({
      userList: value,
    });
  }

  render() {
    return (
      <div style={{ width: 500 }}>
        <Autocomplete
          onChange={this.props.onChange}
          id="free-solo-demo"
          freeSolo
          options={this.state.userList.map((option) => option.login)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Git Users"
              margin="normal"
              variant="outlined"
            />
          )}
        />
      </div>
    );
  }
}
