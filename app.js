/* mongodb */
require('dotenv').config();
const { MongoClient } = require("mongodb");
const url = process.env.DB_URL;
const client = new MongoClient(url);


/* express */
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 첫 접속 시 HTML 템플릿 제공
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/todoList', (req, res) => {
  getTodoList();
  async function getTodoList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');

    col.insertMany([
      {
        id: String(Date.now()),
        done: false,
        content: 'content1'
      },
      {
        id: String(Date.now()),
        done: false,
        content: 'content2'
      },
      {
        id: String(Date.now()),
        done: false,
        content: 'content3'
      }
    ]);

    const todoList = await col.find({}).toArray();
    console.log(todoList);

    res.send(todoList);
  }
});

app.listen(port, () => {
  console.log(`To-Do app listening on port ${port}`);
});