import userContent from "./api/v1/controllers/user/routes";
import noteContent from "./api/v1/controllers/note/routes";




export default function Routes(app) {
    app.use("/api/v1/user", userContent);
    app.use("/api/v1/note", noteContent);
    return app;
}