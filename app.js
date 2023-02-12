/*  */

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

/* 최상위 URL로 GET 요청 시 index.html 파일 응답 */
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

/* 전체 목록 조회 */
app.get('/todolist', (req, res) => {
  getToDoList();
  async function getToDoList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    const todoList = await col.find({}).toArray();
    console.log(todoList);
  }
});

/* 사용할 포트 지정 */
app.listen(port, () => {
  console.log(`To-Do app listening on port ${port}`);
});