const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'
}

const names = ['Sara', 'Bruno', 'Richard', 'Wesley', 'Daniel'];

const connection = mysql.createConnection(dbConfig);

app.get('/', (req, res) => {  
  let template = '<h1>Full Cycle Rocks!</h1>';

  const randomIndex = Math.floor(Math.random() * names.length);
  const insertQuery = `INSERT INTO people(name) values('${ names[randomIndex] }')`;
  connection.query(insertQuery);

  connection.query('select * from people', (err, result, fields) => {
    result.forEach(person => template += `<h2>${ person.id } - ${ person.name }</h2>`);

    res.send(template);
  })
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})