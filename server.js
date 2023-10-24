const express = require("express");
const cors = require("cors");
const {
  signUp,
  confirmSignUp,
  signIn,
  getCurrentUser,
  getSession,
  signOut,
} = require("./middleware/auth");
const { default: axios } = require("axios");

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`BFF server is running on port ${port}`);
});

app.post("/api/v1/sign-up", async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const cognitoUser = await signUp(username, email, password);
    // const dataBaseUser = await createUser(fullname, username, email, password);

    res.json({ success: true, user: cognitoUser });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/api/v1/confirm-signup", async (req, res) => {
  try {
    const { username, code } = req.body;

    const result = await confirmSignUp(username, code);

    res.json({ success: true, message: "User confirmed successfully", result });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  console.log("Signed in");
  try {
    const { username, password } = req.body;
    const cognitoUser = await signIn(username, password);
    res.json({
      success: true,
      message: "User confirmed successfully",
      cognitoUser,
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/api/v1/current-user", async (req, res) => {
  try {
    const cognitoUser = await getCurrentUser();
    console.log(JSON.stringify(cognitoUser));
    res.json({
      success: true,
      message: "User confirmed successfully",
      cognitoUser,
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/api/v1/current-session", async (req, res) => {
  try {
    const cognitoUser = await getSession();
    res.json({
      success: true,
      message: "User confirmed successfully",
      cognitoUser,
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.post("/api/v1/signout", async (req, res) => {
  try {
    const cognitoUser = await signOut();
    res.json({
      success: true,
      message: "User confirmed successfully",
      cognitoUser,
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});


function createProducts(name, description, price, quantity) {
  const product = {
    productName: name,
    productDescription: description,
    productPrice: price,
    productQuantity: quantity,
  };
  console.log(product);
  return axios
    .post("http://localhost:8080/api/v1/products", product)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in Creating Product: ", error);
      throw error;
    });
}

app.post("/api/create-product", async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body; 
    console.log(req.body);

    const response = await createProducts(name, description, price, quantity);

    if (response.success) {
      res.status(200).json(response.result);
    } else {
      res.status(500).json({ error: response.error });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/get-products", async (req, res) => {
  try {
    const response = await getProducts();

    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function getProducts() {
  console.log("ok");
  return axios
    .get("http://localhost:8080/api/v1/products")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in Reyriving Products: ", error);
      throw error;
    });
}

app.post("/api/get-product", async (req, res) => {
  console.log("done");
  try {
    const productId = req.body;
    console.log(req.body);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function getProduct(productId) {
  return axios
    .get(`http://localhost:8080/api/v1/products/${productId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error in Reyriving Product: ", error);
      throw error;
    });
}









// app.post("/api/create-product", async (req, res) => {
//   try {
//     console.log("Done");
//     const { product } = req.body;
//     const {currentProduct} = await createProduct(product);
//     console.log(req.body);
//     res.json({ success: true, product: product });
//   } catch (err) {
//     res.json({ success: false, error: err.message });
//   }
// });