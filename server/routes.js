import path from "path";
import todo from "./todo";

module.exports = {
    configure: (app) => {

        app.get("/todo/", (req, res) => {
            todo.get(res);
        });

        app.post("/todo/", (req, res) => {
            todo.create(req.body, res);
        });

        app.put("/todo/", (req, res) => {
            todo.update(req.body, res);
        });

        app.delete("/todo/:id/", (req, res) => {
            todo.delete(req.params.id, res);
        });

        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname,"../index.html"));
        });
    }
};
