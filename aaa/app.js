/*
    Author: ZhaoShuai
    Mob: 13683088643
    QQ & WeChat: 1812532016
*/
const express = require('express');
const static = require('express-static');
const app = express();
const web = require('./routes/web');
const admin = require('./routes/admin');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'blog'
});

db.connect();

app.set('views', 'templates');

app.get('/', (req, res, next) => {
  db.query(`SELECT * FROM banner`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('banner database error!!!').end();
    } else {
      res.banners = data;
      next();
    }
  });
});

app.get('/', (req, res) => {
  db.query(`SELECT title,summary,id FROM articles`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('articles database error!!!').end();
    } else {
      // console.log('data:', data);
      res.render('index.ejs', {arr: res.banners, news: data});
    }
  })
});

app.get('/article', (req, res, next) => {
  let id = req.query.id;
  db.query(`SELECT content,postTime,title FROM articles WHERE ID=${id}`, (err, data) => {
    if (!err) {
      console.log(data);
      res.render('conText.ejs', {cons: data});
    } else {
      res.send('404, 抱歉, 此页面不存在!').end();
    }
  });
});

app.get('/reg', (req, res) => {
  res.render('login_register.ejs');
});

app.get('/users', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  db.query(`INSERT INTO users (id, imgSrc, username, password) VALUES (0,'','${username}', '${password}')`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ok: true});
      res.end();
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login_user.ejs');
});

app.get('/logins', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  
  db.query(`SELECT username, password FROM users`, (err, data) => {
    if (err) {
      console.log(err);
      res.send('服务器错误!').end();
    } else {
      res.json({data: data});
    }
  })
});

app.get('/mydoc', (req, res) => {
  res.render('mydoc.ejs');
});

//配置路由:
app.use('/', web);
app.use('/admin', admin);

app.use(static('./www'));

app.listen(8090);





















