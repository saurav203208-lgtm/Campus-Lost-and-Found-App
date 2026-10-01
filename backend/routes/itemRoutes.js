const express = require("express");

const {
    createItem,
    getItems,
    getItemById,
    claimItem,
    returnItem
} = require("../controllers/itemController");

const authMiddleware =
    require("../middleware/authMiddleware");

const upload =
    require("../middleware/upload");

const router = express.Router();


// Create item
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createItem
);


// Get all items
router.get(
    "/",
    getItems
);


// Get single item
router.get(
    "/:id",
    getItemById
);


// Claim item
router.put(
    "/:id/claim",
    authMiddleware,
    claimItem
);


// Mark returned
router.put(
    "/:id/return",
    authMiddleware,
    returnItem
);


module.exports = router;