const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql2')
var connection = mysql.createConnection({
    host: 'gaspal-db.cthfxs3cicdw.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'gaspal123',
    database: 'gaspaldb'
})

connection.connect();
connection.query('SELECT * from car', function (err, rows, fields) {
    if (err) throw err

    console.log(rows)
})
connection.end();

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/g', (req, res) => {
    res.send('Goodbye!')
})

app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user');
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user');
});

app.put('/users', (req, res) => {
    return res.send('PUT HTTP method on user');
});

app.delete('/users', (req, res) => {
    return res.send('DELETE HTTP method on user');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})