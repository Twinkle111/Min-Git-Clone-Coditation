import { RestUtils } from "../utils/RestUtils";

export function getUserList(successCallback, failureCallback) {
  RestUtils.get("https://api.github.com/users&sort=stars&order=desc")
    .then((response) => {
      if (response.status === 200) {
        console.log("https://api.github.com/users", response.status, response);
        successCallback(response.data);
      } else {
        failureCallback(response);
        console.log("https://api.github.com/users", response.status, response);
      }
    })
    .catch((err) => {
      console.log("https://api.github.com/users", "axios error : ", err);
      failureCallback(err);
    });
}

export function getUserData(param, successCallback, failureCallback) {
  RestUtils.get("https://api.github.com/search/users?q=" + param)
    .then((response) => {
      if (response.status === 200) {
        console.log(
          "https://api.github.com/search/users?q=" + param,
          response.status,
          response
        );
        successCallback(response.data);
      } else {
        failureCallback(response);
        console.log(
          "https://api.github.com/search/users?q=" + param,
          response.status,
          response
        );
      }
    })
    .catch((err) => {
      console.log(
        "https://api.github.com/search/users?q=" + param,
        "axios error : ",
        err
      );
      failureCallback(err);
    });
}

export function getRepoData(param, successCallback, failureCallback) {
  RestUtils.get("https://api.github.com/search/users?q=" + param)
    .then((response) => {
      if (response.status === 200) {
        console.log(
          "https://api.github.com/search/users?q=" + param,
          response.status,
          response
        );
        successCallback(response.data);
      } else {
        failureCallback(response);
        console.log(
          "https://api.github.com/search/users?q=" + param,
          response.status,
          response
        );
      }
    })
    .catch((err) => {
      console.log(
        "https://api.github.com/search/users?q=" + param,
        "axios error : ",
        err
      );
      failureCallback(err);
    });
}

export function getReposListing(url, successCallback, failureCallback) {
  RestUtils.get(url)
    .then((response) => {
      if (response.status === 200) {
        console.log(url, response.status, response);
        successCallback(response.data);
      } else {
        failureCallback(response);
        console.log(url, response.status, response);
      }
    })
    .catch((err) => {
      console.log(url, "axios error : ", err);
      failureCallback(err);
    });
}
