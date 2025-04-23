const router = require("express").Router();
const deliveryController = require("../controllers/deliveryController");


router.get("/", deliveryController.pingDeliveryServer);
router.post("/rate", deliveryController.getRate);
// router.post("/sendMail",emailController.sendMail);


module.exports = router;