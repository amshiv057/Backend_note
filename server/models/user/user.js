import mongoose, { model } from "mongoose";

const timeStamps = {
    timestamps: true,
    collection: 'user'
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    }
}, timeStamps);

module.exports = mongoose.model("user", userSchema);