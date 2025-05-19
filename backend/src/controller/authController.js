const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../services/prismaClient");
const config = require("../config/authConfig");
const  sendEmailVerificationCode  = require("../services/emailService");
// require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        email:email
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });

    await sendEmailVerificationCode(newUser);

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let User = await prisma.users.findUnique({
      where: { email },
    });


    if (!User) {
      return res
        .status(404)
        .json({ message: "User not found Please make your account" });
    }

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign(
      { id: User.id, email: User.email, name: User.name, role: User.role },
      config.secret,
      { expiresIn: "24h" }
    );

    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({
      token,
      user: {
        id: User.id,
        email: User.email,
        role: User.role,
        name: User.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login
};

