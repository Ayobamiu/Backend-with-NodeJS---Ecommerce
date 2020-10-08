const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("./product");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowerCase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid!!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 18,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number!");
        }
      },
    },
    image: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("remove", async function (next) {
  const user = this;
  await Product.deleteMany({ owner: user._id });
  next();
});

userSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("carts", {
  ref: "Cart",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "myjwtsecretkey");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByLoginDetails = async (email, password) => {
  //check user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Login Failed!!");
  }

  //compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Login Failed!!");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
