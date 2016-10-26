import path from "path";
import todo from "./todo";

module.exports = {
    configure: function(app) {

        app.get("/todo/", function(req, res) {
            todo.get(res);
        });

        app.post("/todo/", function(req, res) {
            todo.create(req.body, res);
        });

        app.put("/todo/", function(req, res) {
            todo.update(req.body, res);
        });

        app.delete("/todo/:id/", function(req, res) {
            todo.delete(req.params.id, res);
        });

        app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname,"../index.html"));
        });
    }
};
