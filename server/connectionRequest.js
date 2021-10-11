module.exports = function () {
    var mysql = require('mysql2')
    var connection = mysql.createConnection({
        host: 'gaspal-db.cthfxs3cicdw.us-east-2.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'gaspal123',
        database: 'gaspaldb'
    });

    connection.connect(function(err) {
        if(err) {
            console.log('connection request failed')
        }
        else {
            console.log('DB connection request successful')
        }
    });
    return connection
}