export const SET_USER_LIST = "set-user-list";
export const SET_SELECTED_USER_DATA = "set-selected-user-data";

export const setUserList = (userList) => ({
  type: SET_USER_LIST,
  userList,
});

export const setSelectedUserData = (selectedUserData) => ({
  type: SET_SELECTED_USER_DATA,
  selectedUserData,
});
