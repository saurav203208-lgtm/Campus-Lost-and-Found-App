const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["lost", "found"],
            required: true
        },

        category: {
            type: String,
            enum: [
                "Electronics",
                "Documents",
                "Books",
                "Accessories",
                "Other"
            ],
            required: true
        },

        location: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["active", "claimed", "returned"],
            default: "active"
        },

        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        claimedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Item", itemSchema);