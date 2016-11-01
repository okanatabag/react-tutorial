var connection = require("./connection");

function Todo() {
    this.get = (res) => {
        connection.acquire((err, con) => {
            con.query("select * from todo_list", (err, result) => {
                con.release();
                res.send(result);
            });
        });
    };
    this.create = (todo, res) => {
        connection.acquire((err, con) => {
            console.log(todo);
            var q = con.query("insert into todo_list set ?",
                todo, 
                (err, result) => {
                    con.release();
                    console.log(err);
                    if (err) {
                        res.send({status: 1, message: "TODO creation failed"});
                    } else {
                        res.send({status: 0, message: "TODO created successfully", result: result});
                    }
                });
        });
    };
    this.update = (todo, res) => {
        connection.acquire((err, con) => {
            var q = con.query("update todo_list set ? where id = ?",
                [todo, todo.id],
                (err, result) => {
                    con.release();
                    console.log(err);
                    console.log(q.sql);
                    if (err) {
                        res.send({status: 1, message: "TODO update failed"});
                    } else {
                        res.send({status: 0, message: "TODO updated successfully"});
                    }
                });
        });
    };
    this.delete = (id, res) => {
        connection.acquire((err, con) => {
            con.query("delete from todo_list where id = ?", [id], (err, result) =>{
                con.release();
                if (err) {
                    res.send({status: 1, message: "Failed to delete"});
                } else {
                    res.send({status: 0, message: "Deleted successfully"});
                }
            });
        });
    };
}
module.exports = new Todo();
