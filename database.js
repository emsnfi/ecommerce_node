
var mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const database = express();

database.use(bodyparser.json());
database.use(express.json());


database.get("/", function(req, res) {
        res.sendFile(__dirname + '/data.html', function(err) {
            if (err) res.send(404);
        });
    });
  
 

// 建立連線
var conn = mysql.createConnection({
host : '127.0.0.1',
user : 'root',
password : 'root506411',
database : 'ecommerce'
});
const port = 8080;
// 建立連線後不論是否成功都會呼叫
conn.connect(function(err){
        if(!err)
            console.log('connect success!');
        else
          console.log("DB connection failed \n Error:" + JSON.stringify(err,undefined,2));
});
// 其他的資料庫操作，位置預留

//查詢全部
var re = [];
database.get('/list', (req, res) => {
        /*const conn = await connection(dbConfig).catch(e => {}) 
        const results = await query(conn, 'SELECT * FROM tweets').catch(console.log);
        res.json({ results });*/
        conn.query("SELECT * FROM product", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                result = JSON.stringify(result)
                re.push(result)
                
                res.send(result);
              });
        
      })

//查詢某一欄位
database.get('/list/:id', (req, res) => {
        /*const conn = await connection(dbConfig).catch(e => {}) 
        const results = await query(conn, 'SELECT * FROM tweets').catch(console.log);
        res.json({ results });*/
        conn.query("SELECT * FROM product where productId = ?",[req.params.id], function (err, result, fields) {
                if (err) throw err;
                
               
                res.send(result);
              });
        
      })


//新增
database.get('/list/:id', (req, res) => {
/*const conn = await connection(dbConfig).catch(e => {}) 
const results = await query(conn, 'SELECT * FROM tweets').catch(console.log);
res.json({ results });*/
        conn.query("SELECT * FROM product where productId = ?",[req.params.id], function (err, result, fields) {
                if (err) throw err;
                
               
                res.send(result);
              });
        
      })


//建立 server
database.listen(port,()=>{
        console.log(`server listen to http://localhost:${port}`)
})

// 關閉連線時呼叫
/*conn.end(function(err){
if(err) throw err;
console.log('connect end');
})*/