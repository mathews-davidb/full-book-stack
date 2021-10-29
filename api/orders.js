const { addCartItem } = require("../db/cart_items");
const {
  getCart,
  createOrder,
  updateOrder,
  getPurchaseOrders,
} = require("../db/orders");
const { getProductById, updateProduct } = require("../db/products");

const ordersRouter = require("express").Router();

//==========================================================

ordersRouter.get("/me", async (req, res, next) => {
  // if (!req.user) {
  //   next();
  // }
  try {
    // const userId = req.user.userId; change below back to userId
    const resp = await getPurchaseOrders(1);
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
});

//==========================================================

ordersRouter.post("/", async (req, res, next) => {
  // if (!req.user) {
  //   next();
  // }
  try {
    // const userId = req.user.id; change below back to id
    const newOrder = await createOrder(1);
    res.send(newOrder);
  } catch (error) {
    console.error(error);
  }
});

//==========================================================

ordersRouter.patch("/:id", async (req, res, next) => {
  // if (!req.user) {
  //   next();
  // }
  try {
    const id = req.params.id;
    const user_id = req.body.user_id;
    const cart = await getCart(user_id);
    const products = cart.products;

    for (let product of products) {
      const quantity = product.quantity;
      //   console.log(quantity, product.product_id);
      const productInfo = await getProductById(product.product_id);
      let stock = productInfo.stock;
      stock = productInfo.stock - quantity;
      await updateProduct({ id: product.product_id, stock: stock });
    }

    const orderUpdate = await updateOrder(id);
    res.send(orderUpdate);
  } catch (error) {
    console.log(error);
  }
});

//==========================================================

ordersRouter.get("/cart", async (req, res, next) => {
  // if (!req.user) {
  //   next();
  // }
  try {
    // const userId = req.user.id; change below back to userId
    const resp = await getCart(1);
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
});

//==========================================================

ordersRouter.post("/:id/products", async (req, res, next) => {
  // if (!req.user) {
  //   next();
  // }
  try {
    const order_id = req.params.id;
    const { product_id, quantity } = req.body;
    const resp = await addCartItem({
      order_id,
      product_id,
      quantity,
    });
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
});

//==========================================================

module.exports = ordersRouter;
