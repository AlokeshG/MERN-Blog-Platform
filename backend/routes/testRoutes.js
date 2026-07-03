const express = require("express");
const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.get(
    "/admin",
    protect,
    authorize("superadmin"),
    (req, res) => {

        res.json({

            message: "Welcome Super Admin"

        });

    }
);

module.exports = router;