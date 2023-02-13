/* dotenv */
require('dotenv').config();

/* Mongo DB 사용에 필요한 변수 */
const { MongoClient } = require("mongodb");
const url = process.env.DB_URL;  // .env 파일에서 API key 불러오기
const client = new MongoClient(url);

/* express 사용에 필요한 변수 */
const express = require('express');
const app = express();
const port = 3000;

/* express 정적 파일 제공 */
app.use(express.static('public'));

/*
  DB 데이터를 JSON으로 수신
  Mongo DB의 body-parser 대신 사용한다
*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* 최상위 URL로 GET 요청 시 index.html 파일 응답 */
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

/* DB에서 To-Do 리스트 가져오기 */
app.get('/todolist', (req, res) => {
  getToDoList();
  async function getToDoList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    const todoList = await col.find({}).toArray();
    console.log(todoList);

    res.send(todoList);
  }
});

/* 사용할 포트 지정 */
app.listen(port, () => {
  console.log(`To-Do app listening on port ${port}`);
});