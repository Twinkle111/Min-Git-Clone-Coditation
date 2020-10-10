import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { AutoCompleteSearchBox } from "./commonWidgets.js/AutoCompleteSearchBox";
import { UsersList } from "./commonWidgets.js/UsersList";
import { UserReposDetails } from "./commonWidgets.js/UserReposDetails";
import { connect } from "react-redux";
import * as actions from "./actions/Action";
import { getUserData } from "./utils/RestUtilCalls";
import { isUndefinedOrNull } from "./utils/StringValidator";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDetails: false,
    };

    this.success = this.success.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchInput = (evt, value) => {
    getUserData(value, this.success, this.fail);
  };

  success(value) {
    if (!isUndefinedOrNull(value)) {
      let newObj = {};
      value.items.forEach((element) => {
        newObj[element.login] = element;
      });
      this.props.setUserList(newObj);
    }
  }

  fail(value) {}

  handleVisibilityOfUserDetail = (show) => {
    this.setState({ showUserDetails: show });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Github Mini Clone</h1>
          {!this.state.showUserDetails ? (
            <div>
              <AutoCompleteSearchBox onChange={this.handleSearchInput} />
              <UsersList
                userList={this.props.userList}
                setSelectedUserData={this.props.setSelectedUserData}
                showUserDetails={this.handleVisibilityOfUserDetail}
              />
            </div>
          ) : (
            <UserReposDetails
              selectedUserData={this.props.selectedUserData}
              showUserDetails={this.handleVisibilityOfUserDetail}
            />
          )}
          <h3>
            Coditation <h6>By - Twinkle Jain</h6>
          </h3>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserList: (userList) => dispatch(actions.setUserList(userList)),
  setSelectedUserData: (userData) =>
    dispatch(actions.setSelectedUserData(userData)),
});

const mapStateToProps = (state) => ({
  userList: state.appReducer.userList,
  selectedUserData: state.appReducer.selectedUserData,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
