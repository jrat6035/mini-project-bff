const { API_ROUTE_PATHS } = require("../constants/routes");

async function createProduct(product) {
  const response = await fetch(`${API_ROUTE_PATHS.PRODUCTS_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const result = await response.json();
  if (result.success) {
    return result;
  } else {
    throw new Error("Failed to create product");
  }
}

async function getProducts() {
  const response = await fetch(API_ROUTE_PATHS.PRODUCTS_BASE_URL);
  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Could not fetch products");
  }
}

async function getProductById(productId) {
  const response = await fetch(
    `${API_ROUTE_PATHS.PRODUCTS_BASE_URL}/${productId}`
  );
  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Could not fetch product");
  }
}

async function updateProductById(productId, product) {
  const response = await fetch(
    `${API_ROUTE_PATHS.PRODUCTS_BASE_URL}/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  const result = await response.json();
  if (result.success) {
    return result;
  } else {
    throw new Error("Failed to update product");
  }
}

async function removeProductById(productId) {
  const response = await fetch(
    `${API_ROUTE_PATHS.PRODUCTS_BASE_URL}/${productId}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();
  if (result.success) {
    return result;
  } else {
    throw new Error("Failed to update product");
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  removeProductById,
};
