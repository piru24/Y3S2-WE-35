const express = require("express");
const router = express.Router();
const cart = require("../model/order");
const orderController= require("../order-controller/order-controller");
const requireAccess  = require("../middlewares")

router.post("/addOrder", requireAccess.requireAuth, requireAccess.requireRoleBuyer, orderController.addOrder);
router.get("/getOrders", requireAccess.requireAuth, requireAccess.requireRoleSeller, orderController.getAllOrder);
//router.get("/getOrder/:userId",requireAccess.requireAuth, requireAccess.requireRoleBuyer, orderController.getOrder);
router.get("/orderhistory",requireAccess.requireAuth, requireAccess.requireRoleBuyer, orderController.getOrderByBuyersId);
router.put("/updateOrder/:id",requireAccess.requireAuth, requireAccess.requireRoleSeller, orderController.updateOrder);
router.delete("/deleteOrder/:id",requireAccess.requireAuth, requireAccess.requireRoleSeller, orderController.deleteOrder);

router.post("/payment", requireAccess.requireAuth, requireAccess.requireRoleBuyer, orderController.stripePay)

module.exports = router;