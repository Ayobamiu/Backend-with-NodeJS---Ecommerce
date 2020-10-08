const auth = require("../middlewares/auth");
const express = require("express");
const Cart = require("../models/cart");
const Order = require("../models/order");

const router = express.Router();

router.post("/orders", auth, async (req, res) => {
  const owner = req.user._id;
  try {
    let products = [];
    let amount = 0;
    const carts = await Cart.find({});
    if (!carts) {
      res.status(404).send({ error: "Empty cart." });
    }
    for (let index = 0; index < carts.length; index++) {
      const cart = carts[index];
      await cart.populate("product").execPopulate();
      products.push({ product: cart.product._id });
      amount += cart.product.price;
    }
    const order = new Order({
      products,
      owner,
      amount,
    });
    await order.save();
    res.send(order);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/orders", auth, async (req, res) => {
  try {
    await req.user.populate("orders").execPopulate();
    const orders = req.user.orders;
    res.send(orders);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/orders/:orderID", auth, async (req, res) => {
  const _id = req.params.orderID;
  try {
    const order = await Order.findOneAndDelete({
      _id,
      owner: req.user._id,
    });
    if (!order) {
      res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
