import UserModel from "../mongodb/models/user.model.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
const app = express();
app.use(cors());
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Starter Package" }],
  [2, { priceInCents: 100000, name: "Pro Package" }],
]);

export async function createCheckoutSession(req, res) {
  try {
    const { userEmailId } = req.body;
    const loggedInUserEmail = userEmailId;
    const session = await stripe.checkout.sessions.create({
      invoice_creation: { enabled: true },
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/completion?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard`,
      customer_email: loggedInUserEmail,
    });
    const lineItems = req.body.items.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });
    res.json({ url: session.url, id: session.id, lineItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//! Checking the webhook event of stripe for a successful payment
export async function handleWebhookEvent(request, response) {
  let event = request.body;
  const signature = request.headers["stripe-signature"];
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return response.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const totalAmountMoney = session.amount_total;

    let newToken = 200000;
    let newImageToken = 10;
    let upgradeToken;
    let upgradeImageToken;

    if (totalAmountMoney === 10000) {
      upgradeToken = newToken;
      upgradeImageToken = newImageToken;
    } else if (totalAmountMoney === 20000) {
      upgradeToken = newToken * 2;
      upgradeImageToken = newImageToken * 2;
    } else if (totalAmountMoney === 30000) {
      upgradeToken = newToken * 3;
      upgradeImageToken = newImageToken * 3;
    } else if (totalAmountMoney === 100000) {
      upgradeToken = newToken * 15;
      upgradeImageToken = newImageToken * 10;
    }

    const customerEmail = session.customer_email;
    const user = await UserModel.findOne({ email: customerEmail });
    if (!user) {
      console.log("User not found");
    } else {
      let totalToken = user.credits || 0;
      let totalImageToken = user.imgtoken || 0;
      totalToken += upgradeToken;
      totalImageToken += upgradeImageToken;
      user.credits = totalToken;
      user.imgtoken = totalImageToken;
      await user.save();
    }
  }
  response.sendStatus(200);
}
