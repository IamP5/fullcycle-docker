const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const names = [
  'Sara', 'Bruno', 'Wesley', 'Diego', 
  'Richard', 'Sarah', 
  'Ana', 'Joao', 'Leticia', 'Mayk'
];

app.get('/', (req,res) => {
  const connection = mysql.createConnection(config);
  const randomIndex = Math.floor(Math.random() * 10);

  const insertStatement = (`INSERT INTO people(name) VALUES('${ names[randomIndex] }')`);
  connection.query(insertStatement);

  connection.query("SELECT * FROM people", (err, result, fields) => {
    let template = `<h1>Full Cycle Rocks!</h1>`;
    result.forEach(result => template += `<h2>${ result.id } - ${ result.name }</h2>`);

    res.send(template);
  });
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})