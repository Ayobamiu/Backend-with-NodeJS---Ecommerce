const auth = require("../middlewares/auth");
const Cart = require("../models/cart");
const express = require("express");

const router = express.Router();

router.post("/carts/:productID", auth, async (req, res) => {
  const product = req.params.productID;
  const owner = req.user._id;
  const count = req.query.count;
  const cart = new Cart({
    product,
    owner,
    count,
  });

  try {
    await cart.save();
    await cart.populate("product").execPopulate();
    await cart.populate("owner").execPopulate();
    res.send(cart);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/carts", auth, async (req, res) => {
  try {
    await req.user.populate("carts").execPopulate();
    for (let index = 0; index < req.user.carts.length; index++) {
      const cart = req.user.carts[index];
      await cart.populate("product").execPopulate();
      await cart.populate("owner").execPopulate();
    }
    res.send(req.user.carts);
  } catch (error) {
    res.status(404).send();
  }
});

router.patch("/carts/:cartID", auth, async (req, res) => {
  const cartID = req.params.cartID;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["count"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates." });
  }
  try {
    const cart = await Cart.findOne({
      _id: cartID,
      owner: req.user._id,
    });
    if (!cart) {
      res.status(404).send();
    }
    updates.forEach((update) => (cart[update] = req.body[update]));
    await cart.save();
    await cart.populate("product").execPopulate();
    await cart.populate("owner").execPopulate();
    res.send(cart);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete("/carts/:cartID", auth, async (req, res) => {
  const cartID = req.params.cartID;
  try {
    const cart = await Cart.findOneAndDelete({
      _id: cartID,
      owner: req.user._id,
    });
    if (!cart) {
      res.status(404).send();
    }
    res.send(cart);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
