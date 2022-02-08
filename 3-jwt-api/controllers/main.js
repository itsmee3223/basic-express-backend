const { Router } = require("express");
const { login, dashboard } = require("../routes/main");

const router = Router();

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

module.exports = router