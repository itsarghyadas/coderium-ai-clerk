import express from "express";
import * as userController from "../controller/user.controller.js";
import * as chatController from "../controller/chat.controller.js";
import * as paymentController from "../controller/payment.controller.js";
import WebhookHandler from "../middleware/expressRaw.js";
import validateRequest from "../middleware/validateReq.js";

const router = express.Router();

//! POST routes
router.post("/webhook", WebhookHandler, paymentController.handleWebhookEvent);
router.post(
  "/authwebhook",
  WebhookHandler,
  userController.handleAuthWebhookEvent
);
router.post("/checkout", paymentController.createCheckoutSession);
router.post("/chat", validateRequest, chatController.chat);
router.post("/googlesearch", chatController.googleSearch);
router.post("/searchimage", chatController.searchimage);
router.post("/generateimage", chatController.generateImage);
router.post("/postimage", chatController.postImage);

//! GET routes
router.get("/totalTokens", userController.totalTokens);
router.get("/totalimgtokens", userController.totalImgTokens);
router.get("/getimage", chatController.getImage);

//! PUT routes
router.put("/totalTokens", userController.totalTokens);

export default router;
