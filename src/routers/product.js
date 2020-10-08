const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const sharp = require("sharp");
const auth = require("../middlewares/auth");
const upload = require("../bucket-config/bucket");

//create product
router.post("/products", auth, upload.array("images", 4), async (req, res) => {
  let images = [];
  for (let index = 0; index < req.files.length; index++) {
    const element = req.files[index];
    images.push({ image: element.path });
  }
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    images,
    owner: req.user._id,
  });
  try {
    await product.save();
    await product.populate("owner").execPopulate();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send();
  }
});

//get products e.g. /products?limit=1&skip=1&sortBy=createdAt:desc
router.get("/products", auth, async (req, res) => {
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user 
      .populate({
        path: "products",
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    for (let index = 0; index < req.user.products.length; index++) {
      const product = req.user.products[index];
      await product.populate("owner").execPopulate();
    }
    res.send(req.user.products);
  } catch (error) {
    res.status(500).send();
  }
});

//get product by id
router.get("/products/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    await product.populate("owner").execPopulate();
    res.send(product);
  } catch (error) {
    res.status(404).send();
  }
});

//updatet product by id
router.patch(
  "/products/:id",
  auth,
  upload.array("images", 4),
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description", "price"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Updates!" });
    }
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });
      if (!product) {
        res.status(404).send();
      }
      updates.forEach((update) => {
        product[update] = req.body[update];
      });
      let images = [];
      if (req.files) {
        for (let index = 0; index < req.files.length; index++) {
          const element = req.files[index];
          images.push({ image: element.path });
        }
        product[req.files.fieldname] = images;
      }
      await product.save();
      res.send(product);
    } catch (error) {
      res.status(400).send("Error uploading!!");
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//delete product
router.delete("/products/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!product) {
      res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
