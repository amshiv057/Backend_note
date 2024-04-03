import noteModel from "../../../models/notes/notes"

const noteServices = {
    createNote: async (insertObj) => {
        return await noteModel.create(insertObj);
    },
    findNote: async (query) => {
        return await noteModel.findOne(query);
    },
    updateNote: async (query, obj) => {
        return await noteModel.updateOne(query, obj, { new: true });
    },
    findNoteList: async (query) => {
        return await noteModel.find(query).sort({ createdAt: -1 })
    },
    deleteNote: async (query) => {
        return await noteModel.deleteOne(query);
    }
}

module.exports = { noteServices };