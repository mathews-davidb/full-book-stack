const client = require("./client");
const { getProductById } = require("./products");

//==========================================================

const addProductToOrder = async ({ order_id, product_id, quantity }) => {
  const product = await getProductById(product_id);
  const price = product.price;
  console.log(price);
  try {
    const resp = await client.query(
      `
        INSERT INTO cart_items (order_id, product_id, price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [order_id, product_id, price, quantity]
    );
    const cart_item = resp.rows[0];
    return cart_item;
  } catch (error) {
    throw error;
  }
};

addProductToOrder({ order_id: 1, product_id: 1, quantity: 1 }).then(
  console.log
);
