const express = require("express");
const router = express.Router();
const cart = require("../model/order");
const orderController= require("../order-controller/order-controller");
const requireAccess  = require("../middlewares")
const delivery = require("../model/order");

router.post("/addOrder",  requireAccess.requireAuth, requireAccess.requireRoleBuyer, orderController.addOrder);
router.get("/getOrders", orderController.getAllOrder);
router.get("/getOrder/:id",orderController.getOrder);
//router.get("/getOrder/:userId",requireAccess.requireAuth, requireAccess.requireRoleBuyer, orderController.getOrder);
router.get("/orderhistory", requireAccess.requireAuth, requireAccess.requireRoleBuyer, orderController.getOrderByBuyersId);
router.put("/updateOrder/:id", orderController.updateOrder);
router.delete("/deleteOrder/:id",requireAccess.requireAuth, requireAccess.requireRoleSeller, orderController.deleteOrder);

router.post("/payment", requireAccess.requireAuth, requireAccess.requireRoleBuyer, orderController.stripePay);

router.get("/dispatchedOrders", requireAccess.requireAuth, requireAccess.requireRoleDelivery, orderController.getDispatchedOrders);

module.exports = router;