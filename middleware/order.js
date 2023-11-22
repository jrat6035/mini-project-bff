const { API_ROUTE_PATHS } = require("../constants/routes");

async function placeOrder(order) {
  const response = await fetch(`${API_ROUTE_PATHS.ORDERS_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const result = await response.json();
  if (result.success) {
    return result;
  } else {
    throw new Error("Failed to place order");
  }
}

async function getOrders() {
  const response = await fetch(API_ROUTE_PATHS.ORDERS_BASE_URL);
  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Could not fetch orders");
  }
}

async function getOrdersByUserEmail(userEmail) {
  const response = await fetch(
    `${API_ROUTE_PATHS.ORDERS_BASE_URL}/user/${userEmail}`
  );
  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Could not fetch orders");
  }
}

async function approveOrder(id) {
  const response = await fetch(`${API_ROUTE_PATHS.ORDERS_BASE_URL}/${id}`, {
    method: "PATCH",
  });
  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Could not fetch orders");
  }
}

module.exports = {
  getOrders,
  getOrdersByUserEmail,
  placeOrder,
  approveOrder,
};
