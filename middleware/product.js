const axios = require("axios");
const { API_ROUTE_PATHS } = require("../constants/routes");

function getProducts(active) {
  return axios
    .get(`${API_ROUTE_PATHS.PRODUCTS_BASE_URL}?activeStatus=${active}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in Retrieving: ", error);
      throw error;
    });
}

function createProduct(product) {
  return axios
    .post(API_ROUTE_PATHS.PRODUCTS_BASE_URL, product)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in Creating Product: ", error);
      throw error;
    });
}

function getProductById(productId) {
  return axios
    .get(`${API_ROUTE_PATHS.PRODUCTS_BASE_URL}/${productId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in Retrieving a product by ID: ", error);
      throw error;
    });
}

function updateProductById(productId, product) {
  return axios
    .put(`${API_ROUTE_PATHS.PRODUCTS_BASE_URL}/${productId}`, product)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in Updating a product by ID: ", error);
      throw error;
    });
}

function removeProductById(productId) {
  return axios
    .delete(`${API_ROUTE_PATHS.PRODUCTS_BASE_URL}/${productId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in Removing a product by ID: ", error);
      throw error;
    });
}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  removeProductById,
};
