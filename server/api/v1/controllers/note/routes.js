import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";

export default Express.Router()
    .use(auth.verifyToken)
    .post('/createNote', controller.createNote)
    .put('/updateNote', controller.updateNote)
    .get('/getNote/:id', controller.getNote)
    .get('/getNoteList', controller.getNoteList)
    .delete('/deleteNote/:id', controller.deleteNote)