const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByName,
  getProductByCategory,
} = require("../db/products");

const productsRouter = express.Router();

//==========================================================

productsRouter.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

//==========================================================

productsRouter.post("/", async (req, res, next) => {
  const { name, description, price, stock, category, author, image } = req.body;
  if (
    !name ||
    !description ||
    !price ||
    !stock ||
    !category ||
    !author ||
    !image
  ) {
    return next({ error: "Missing input field" });
  }
  const nameCheck = await getProductByName(name);
  if (nameCheck) {
    if (nameCheck.name === name) {
      return next({ error: "Another product already exists with this name" });
    }
  }
  const newProduct = await createProduct({
    name,
    description,
    price,
    stock,
    category,
    author,
    image,
  });
  res.send(newProduct);
});

//==========================================================

productsRouter.patch("/:productId", async (req, res, next) => {
  const id = req.params.productId;
  const { name, description, price, stock, category, author, image } = req.body;
  if (
    !name &&
    !description &&
    !price &&
    !stock &&
    !category &&
    !author & !image
  ) {
    return next({ error: "At least one input field must be filled out" });
  }
  const nameCheck = await getProductByName(name);
  if (nameCheck) {
    if (nameCheck.name === name) {
      return next({ error: "Another product already exists with this name" });
    }
  }
  const editProduct = await updateProduct({
    id,
    name,
    description,
    price,
    stock,
    category,
    author,
    image,
  });
  res.send(editProduct);
});

//==========================================================

productsRouter.delete("/:productId", async (req, res) => {
  const id = req.params.productId;
  await deleteProduct(id);
  res.send({ Message: "Product deleted" });
});

//==========================================================

productsRouter.get("/:category", async (req, res) => {
  const category = req.params.category;
  const product = await getProductByCategory(category);
  res.send(product);
});

//==========================================================

productsRouter.get("/:productId", async (req, res) => {
  const id = req.params.productId;
  const product = await getProductById(id);
  res.send(product);
});

//==========================================================

module.exports = productsRouter;
