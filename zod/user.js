const zod = require("zod");

const userSignUp = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  userName: zod.string().email(),
  password: zod.string().min(6),
  signUpAs: zod.string(),
});

const userSignIn = zod.object({
  userName: zod.string().email(),
  password: zod.string().min(6),
  signIpAs: zod.string(),
});

const userPut = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().min(6).optional(),
});

module.exports = {
  userSignUp,
  userSignIn,
  userPut,
};
