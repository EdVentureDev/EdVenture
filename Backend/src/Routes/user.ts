import express from "express";
import zod from "zod";
import argon from "argon2";
import { User } from "../db";
import { getGeneratedOTP, sendOTP } from "./OTP";
const router = express.Router();

async function hashPassword(password: string) {
  return await argon.hash(password);
}

async function passwordVerify(hashedPassword: string, plainPassword: string) {
  return await argon.verify(hashedPassword, plainPassword);
}

const signUpBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string(),
  email: zod.string(),
  educational_institute: zod.string(),
  password: zod.string(),
});

const otpBody = zod.object({
  email: zod.string().email(),
  otp: zod.number().optional(),
  method: zod.string().optional()
});

router.post("/getotp", async function (req, res) {
  const parsedBody = otpBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      msg: "Invalid Format",
    });
  }

  const email = req.body.email;
  const method = req.body.method;
  sendOTP(email,method);

  res.status(200).json({
    msg: "OTP Send Success",
  });
});

router.post("/verifyotp", async function (req, res) {
    const parsedBody = otpBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      msg: "Invalid Format",
    });
  }

  const email = req.body.email;
  const otp = req.body.otp;
  const initialOtp = getGeneratedOTP(email);

  if (initialOtp != otp)
    return res.status(400).json({
      msg: "Wrong OTP",
    });
  return res.status(200).json({
    msg: "Verification Success",
  });
});

router.post("/signup", async function (req, res) {
  const body = req.body;
  const parsedBody = signUpBody.safeParse(body);
  console.log(body,parsedBody)

  if (!parsedBody.success) {
    return res.status(400).json({
      msg: "Invalid Format",
    });
  }

  const existingUser = await User.findOne({ username: body.username });
  if (existingUser) {
    return res.status(400).json({
      msg: "User Already Exists",
    });
  }

  const rawPassword = body.password;
  const hashedPassword = await hashPassword(rawPassword);

  const newUser = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    username: body.username,
    email: body.email,
    educational_institute: body.educational_institute,
    password: hashedPassword,
  });
  newUser.save();
  res.status(200).json({
    msg: "User Created Successfully",
  });
});

const signInBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async function (req, res) {
  const body = req.body;
  const parsedBody = signInBody.safeParse(body);

  if (!parsedBody.success) {
    return res.status(403).json({
      msg: "Invalid Format",
    });
  }

  const findUser = await User.findOne({ username: body.username }).select(
    "+password"
  );

  const hashedPassword = findUser?.password;
  if (findUser == null) {
    return res.status(404).json({
      msg: "User Not Found",
    });
  }

  if (
    hashedPassword != undefined &&
    !(await passwordVerify(hashedPassword, body.password))
  ) {
    return res.status(404).json({
      msg: "Invalid Password",
    });
  } else {
    return res.status(200).json({
      msg: "Log In Success",
    });
  }
});

export default router;
