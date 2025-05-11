const { createNewUser } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/auth/register", createNewUser);

module.exports = router;
