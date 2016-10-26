var mysql = require("mysql");
var server = require("./server.info.json");
console.log();
function Connection() {
    this.pool = null;
    this.init = function() {
        this.pool = mysql.createPool({connectionLimit: 10, host: server.host, user: server.user, password: server.pass, database: server.database});
    };

    this.acquire = function(callback) {
        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });
    };
}

module.exports = new Connection();
