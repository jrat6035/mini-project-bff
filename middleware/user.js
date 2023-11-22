const axios = require("axios");
const { API_ROUTE_PATHS } = require("../constants/routes");

async function localSignUp(user) {
  const response = await fetch(`${API_ROUTE_PATHS.USERS_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();
  if (result.success) {
    return result;
  } else {
    throw new Error("Failed to create user in local db");
  }
}

async function getUserByEmail(userEmail) {
  const response = await fetch(
    `${API_ROUTE_PATHS.USERS_BASE_URL}/${userEmail}`
  );
  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Could not fetch user");
  }
}

module.exports = {
  localSignUp,
  getUserByEmail,
};
