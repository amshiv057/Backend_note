import mongoose from "mongoose";

const timeStamps = {
    timestamps: true,
    collection: "Note"
};


const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
}, timeStamps);

module.exports = mongoose.model("Note", noteSchema);