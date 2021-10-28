const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUser, createUser, getUserByEmail } = require("../db/users");

//==========================================================

usersRouter.post("/register", async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      res.status(401);
      return next({ error: "Register Error: Missing login input" });
    }
    if (password.length < 8) {
      res.status(401);
      return next({
        error: "Register Error: Password must be at least 8 characters",
      });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(401);
      return next({
        error: "Register Error: Account already exists",
      });
    }
    const newUser = await createUser({ email, name, password });
    res.send({ user: newUser });
  } catch (error) {
    throw error;
  }
});

//==========================================================

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    next({
      error:
        "Missing Credentials Error: Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({ message: "you're logged in!", token: token });
    } else {
      res.status(401);
      next({
        error: "Bad Credentials: Email or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

//==========================================================

usersRouter.get("/me", (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }
  res.status(401).send("Not logged in!");
});

//==========================================================

module.exports = usersRouter;
