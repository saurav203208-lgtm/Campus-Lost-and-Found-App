const Item = require("../models/Item");
const cloudinary = require("../config/cloudinary");


// ===============================
// CLOUDINARY UPLOAD
// ===============================
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "campus-lost-found"
            },

            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        stream.end(buffer);
    });
};


// ===============================
// CREATE ITEM
// ===============================
const createItem = async (req, res) => {

    try {

        const {
            title,
            description,
            type,
            category,
            location,
            date
        } = req.body;


        if (
            !title ||
            !description ||
            !type ||
            !category ||
            !location ||
            !date
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }


        let imageUrl = "";


        if (req.file) {

            const result =
                await uploadToCloudinary(req.file.buffer);

            imageUrl = result.secure_url;
        }


        const item = await Item.create({

            title,
            description,
            type,
            category,
            location,
            date,

            image: imageUrl,

            postedBy: req.user.userId
        });


        res.status(201).json({

            success: true,

            message: "Item posted successfully",

            item
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message
        });

    }
};


// ===============================
// GET ALL ITEMS
// ===============================
const getItems = async (req, res) => {

    try {

        const items = await Item.find()

            .populate(
                "postedBy",
                "name email"
            )

            .populate(
                "claimedBy",
                "name email"
            )

            .sort({
                createdAt: -1
            });


        res.json({

            success: true,

            count: items.length,

            items
        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });

    }
};


// ===============================
// GET SINGLE ITEM
// ===============================
const getItemById = async (req, res) => {

    try {

        const item = await Item.findById(
            req.params.id
        )

        .populate(
            "postedBy",
            "name email"
        )

        .populate(
            "claimedBy",
            "name email"
        );


        if (!item) {

            return res.status(404).json({

                success: false,

                message: "Item not found"
            });

        }


        res.json({

            success: true,

            item
        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });

    }
};


// ===============================
// CLAIM ITEM
// ===============================
const claimItem = async (req, res) => {

    try {

        const item =
            await Item.findById(req.params.id);


        if (!item) {

            return res.status(404).json({

                success: false,

                message: "Item not found"
            });

        }


        if (item.status !== "active") {

            return res.status(400).json({

                success: false,

                message: "This item is no longer available"
            });

        }


        if (
            item.postedBy.toString() ===
            req.user.userId
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "You cannot claim your own item"
            });

        }


        item.claimedBy =
            req.user.userId;

        item.status = "claimed";


        await item.save();


        res.json({

            success: true,

            message:
                "Item claimed successfully",

            item
        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });

    }
};


// ===============================
// RETURN ITEM
// ===============================
const returnItem = async (req, res) => {

    try {

        const item =
            await Item.findById(req.params.id);


        if (!item) {

            return res.status(404).json({

                success: false,

                message: "Item not found"
            });

        }


        if (
            item.postedBy.toString() !==
            req.user.userId
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the item owner can mark it returned"
            });

        }


        item.status = "returned";


        await item.save();


        res.json({

            success: true,

            message:
                "Item marked as returned",

            item
        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });

    }
};


module.exports = {

    createItem,
    getItems,
    getItemById,
    claimItem,
    returnItem

};