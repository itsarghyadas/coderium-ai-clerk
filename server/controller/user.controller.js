import UserModel from "../mongodb/models/user.model.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { Webhook } from "svix";

const app = express();
app.use(cors());
dotenv.config();

export async function totalTokens(req, res) {
  try {
    const { username } = req.query;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let totalToken = user.credits || 0;

    if (req.method === "PUT") {
      const { totalToken: newTotalToken } = req.body;
      user.credits = newTotalToken;
      await user.save();
      totalToken = user.credits;
    }

    res.json({ totalToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function totalImgTokens(req, res) {
  try {
    const { username } = req.query;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let totalImgToken = user.imgtoken || 0;
    res.json({ totalImgToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleAuthWebhookEvent(req, res) {
  const payload = req.body;
  const headers = req.headers;
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  const wh = new Webhook(secret);
  let event;
  let signupToken = 10000;
  let signupCredit = 20;
  try {
    event = wh.verify(payload, headers);
    if (event.type === "user.created") {
      const userEmailAdress = event.data.email_addresses[0].email_address;
      const userUsername = event.data.username;

      const user = await UserModel({
        email: userEmailAdress,
        username: userUsername,
        credits: signupToken,
        imgtoken: signupCredit,
      });
      const savedUser = await user.save();
      return res.status(200).send("User created");
    } else {
      return res.status(200).send("User not created");
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send("Invalid signature");
  }
}
