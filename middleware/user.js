const axios = require("axios");
const { API_ROUTE_PATHS } = require("../constants/routes");

function createUser(user) {
    return axios
      .post(API_ROUTE_PATHS.USERS_BASE_URL, user)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error in Creating User: ", error);
        throw error;
      });
  }

  function getUserById(userId) {
    return axios
      .get(`${API_ROUTE_PATHS.USERS_BASE_URL}/${userId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error in Retrieving a User by ID: ", error);
        throw error;
      });
  }

  module.exports = {
    createUser,
    getUserById
  }