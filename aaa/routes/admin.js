/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/
let express = require('express');

let app = express();

let router = express.Router();

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'blog'
});

db.connect();

/*
router.get('/', (req, res) => {

});
*/

router.get('/', (req, res) => {
  db.query(`SELECT * FROM articles`, (err, data) => {
    if (err) {
      res.send('database error').end();
    } else {
      res.render('admin.ejs', {data: data});
    }
  })
});

router.get('/delete', (req, res) => {
  let id = req.query.id;
  console.log(id);
  db.query(`DELETE FROM articles WHERE id=${id}`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('http://localhost:8090/admin');
    }
  })
});

//UPDATE 表格名称 SET password=123456 WHERE username=jack;
router.get('/modify', (req, res) => {
  let id = req.query.id;
  // db.query(`UPDATE  articles SET content=${} WHERE id=id`, (err, data) => {});
});

router.get('/add', (req, res) => {
  res.render('admin-add.ejs');
});

router.get('/adds', (req, res) => {
  let title = req.query.title;
  let href = req.query.href;
  let summary = req.query.summary;
  let content = req.query.content;
  db.query(`INSERT INTO articles (title, href, summary, content) VALUES ('${title}', '${href}', '${summary}', '${content}')`, (err, data)=>{
    if(err){
      console.log(err);
    }else{
      res.send({ok: true}).end();
    }
  })
});

module.exports = router;