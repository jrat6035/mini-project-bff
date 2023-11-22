const express = require("express");
const cors = require("cors");
const {
  signUp,
  confirmSignUp,
  signIn,
  getCurrentUser,
  signOut,
} = require("./middleware/auth");
const {
  createProduct,
  getProductById,
  updateProductById,
  getProducts,
  removeProductById,
} = require("./middleware/product");
const {
  localSignUp,
  getUserByEmail,
} = require("./middleware/user");
const {
  getOrders,
  approveOrder,
  placeOrder,
  getOrdersByUserEmail,
} = require("./middleware/order");

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`BFF server is running on port ${port}`);
});

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { fullname, username, email, password, userType } = req.body;
    const cognitoUser = await signUp(username, email, password);

    const user = {
      userFullName: fullname,
      userEmail: email,
      userType: userType,
    };

    const localUser = localSignUp(user);
    res.json({
      success: true,
      message: "User signed up successfully",
      cognitoUser: cognitoUser,
      localUser: localUser,
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const cognitoUser = await signIn(username, password);

    res.json({
      success: true,
      message: "User signed in successfully",
      cognitoUser: cognitoUser,
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post("/api/v1/signout", async (req, res) => {
  try {
    signOut();
    res.json({ success: true, message: "User signed out successfully" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post("/api/v1/confirm-signup", async (req, res) => {
  try {
    const { username, code } = req.body;
    const result = await confirmSignUp(username, code);

    res.json({ success: true, message: "User confirmed successfully", result });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get("/api/v1/current-user", async (req, res) => {
  try {
    const cognitoUser = await getCurrentUser();
    res.json({
      success: true,
      message: "User confirmed successfully",
      cognitoUser,
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get("/api/v1/get-user/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const user = await getUserByEmail(userEmail);
    res.json(user);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Product

app.post("/api/v1/create-product", async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = {
      productName: name,
      productDescription: description,
      productPrice: price,
      productQuantity: quantity,
    };

    const response = await createProduct(product);

    if (response.success) {
      res.json({
        success: true,
        message: "Product created successfully",
        product: product,
      });
    } else {
      res.json({ success: false, error: "Creating product failed" });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get("/api/v1/get-products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get("/api/v1/get-product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await getProductById(productId);
    res.json(product);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.put("/api/v1/update-product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, quantity } = req.body;
    const product = {
      productName: name,
      productDescription: description,
      productPrice: price,
      productQuantity: quantity,
    };

    const response = await updateProductById(productId, product);

    if (response.success) {
      res.json({
        success: true,
        message: "Product updated successfully",
        product: product,
      });
    } else {
      res.json({ success: false, error: "Updating product failed" });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.delete("/api/v1/delete-product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await removeProductById(productId);
    res.json(product);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Order

app.get("/api/v1/get-orders", async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get("/api/v1/get-orders/:userEmail", async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const orders = await getOrdersByUserEmail(userEmail);
    res.json(orders);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post("/api/v1/place-order", async (req, res) => {
  try {
    const { userEmail, productId, productQuantity, description } = req.body;
    const order = {
      userEmail: userEmail,
      productId: productId,
      productQuantity: productQuantity,
      description: description,
    };

    const response = await placeOrder(order);

    if (response.success) {
      res.json({
        success: true,
        message: "Order placed successfully",
        product: order,
      });
    } else {
      res.json({ success: false, error: "Order failed" });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.patch("/api/v1/approve-order/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await approveOrder(orderId);
    res.json(order);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});
