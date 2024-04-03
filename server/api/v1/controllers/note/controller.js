import Joi from "joi";
import responseMessage from "../../../../../assets/responseMessage";
import response from "../../../../../assets/response";
import apiError from "../../../../helper/apiError";
import { userServices } from "../../services/user";
const { findUser } = userServices;
import { noteServices } from "../../services/note";
const { createNote, findNote, updateNote, findNoteList, deleteNote } = noteServices;

class noteController {
    async createNote(req, res, next) {
        const validSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.body);
            console.log(value.title, value.description)
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const obj = { userId: userResult._id, title: value.title, description: value.description }
            const result = await createNote(obj);
            return res.json(new response(result, responseMessage.NOTE_CREATED))
        } catch (error) {
            next(error);
        }

    }

    async updateNote(req, res, next) {
        const validSchema = Joi.object({
            id: Joi.string().required(),
            title: Joi.string().optional(),
            description: Joi.string().optional()
        });
        try {
            const { value } = validSchema.validate(req.body);
            console.log(value)
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const noteResult = await findNote({ _id: value.id });
            if (!noteResult) {
                throw apiError.notFound(responseMessage.NOTE_NOT_FOUND);
            }
            const obj = { title: value.title, description: value.description }
            const result = await updateNote({ _id: noteResult._id }, obj);
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS))
        } catch (error) {
            next(error);
        }
    }
    async getNote(req, res, next) {
        const validSchema = Joi.object({
            id: Joi.string().required(),
        });
        try {
            const { value } = validSchema.validate(req.params);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const noteResult = await findNote({ _id: value.id });
            if (!noteResult) {
                throw apiError.notFound(responseMessage.NOTE_NOT_FOUND);
            }
            return res.json(new response(noteResult, responseMessage.DATA_FOUND));
        } catch (error) {
            next(error);
        }
    }
    async getNoteList(req, res, next) {
        try {
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const result = await findNoteList({ userId: userResult._id });
            if (!result) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            next(error);
        }
    }
    async deleteNote(req, res, next) {
        const validSchema = Joi.object({
            id: Joi.string().required(),
        });
        try {
            const { value } = validSchema.validate(req.params);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            const noteResult = await findNote({ _id: value.id });
            if (!noteResult) {
                throw apiError.notFound(responseMessage.NOTE_NOT_FOUND);
            }
            const result = await deleteNote({ _id: noteResult._id });
            return res.json(new response(result, responseMessage.DELETE_SUCCESS))
        } catch (error) {
            next(error);
        }
    }
}

export default new noteController();