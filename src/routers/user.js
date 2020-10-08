const auth = require("../middlewares/auth");
const express = require("express");
const User = require("../models/user");
const {
  sendCancellationMessage,
  sendWelcomeMessage,
} = require("../emails/emails");
const upload = require("../bucket-config/bucket");

const router = express.Router();

//create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    sendWelcomeMessage(user.email, user.name);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

//upload user image
router.post(
  "/users/me/image",
  auth,
  upload.single("image"),
  async (req, res) => {
    req.user.image = req.file.path;
    try {
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send();
    }
  }
);

//update user image
router.patch(
  "/users/me/image",
  auth,
  upload.single("image"),
  async (req, res) => {
    req.user.image = req.file.path;
    try {
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send();
    }
  }
);

//delete user image
router.delete("/users/me/image", auth, async (req, res) => {
  req.user.image = undefined;
  try {
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

//login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByLoginDetails(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

//logout on single device
router.post("/users/logout", auth, async (req, res) => {
  try {
    //remove last token
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

//logout on all devices
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    //remove all tokens
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

//get profile
router.get("/users/me", auth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

//update profile
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "age", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

//delete user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationMessage(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
