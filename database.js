var mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const database = express();
var multer = require('multer');
database.use(bodyparser.json());
database.use(express.json());
database.use(multer());

database.get("/", function (req, res) {
        res.sendFile(__dirname + '/index.html', function (err) {
                if (err) res.send(404);
        });
});



// 建立連線
var conn = mysql.createConnection({
        host: 'sql12.freesqldatabase.com',
        user: 'sql12384832',
        password: 'zFvVkJ5ZGj',
        database: 'sql12384832'
});
const port = 8080;
// 建立連線後不論是否成功都會呼叫
conn.connect(function (err) {
        if (!err)
                console.log('connect success!');
        else
                console.log("DB connection failed \n Error:" + JSON.stringify(err, undefined, 2));
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
        conn.query("SELECT * FROM product where productId = ?", [req.params.id], function (err, result, fields) {
                if (err) throw err;


                res.send(result);
        });

})


//新增
database.get('/list/:id', (req, res) => {
        /*const conn = await connection(dbConfig).catch(e => {}) 
        const results = await query(conn, 'SELECT * FROM tweets').catch(console.log);
        res.json({ results });*/
        conn.query("SELECT * FROM product where productId = ?", [req.params.id], function (err, result, fields) {
                if (err) throw err;


                res.send(result);
        });

});
var jsonParser = bodyparser.json();
var urlencodedParser = bodyparser.urlencoded({ extended: false })
database.post('/apple', (req, res) => {
	console.log(req.body)
	res.send('Hello World!')
})

database.use(bodyparser.urlencoded({ extended: false }));
database.post('/submitform', urlencodedParser,function (req, res, next) {
        console.log(req.body.name);
       
        var id = req.body.productid;
        var Name = req.body.name;
        var price = req.body.price;
        var des = req.body.description;
        
        
        res.write('You sent the id "' + req.body.productid + '".\n');
        res.write('You sent the name "' + req.body.name + '".\n');
        res.write('You sent the price "' + req.body.price + '".\n');
        res.write('You sent the decribe "' + req.body.description + '".\n');
        
        
       
                var sql = "INSERT INTO `product`(`productId`,`name`,`price`,`description`) VALUES ('" + id + "', '" + Name + "','" + price + "','"+des+"')";
                conn.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 record inserted");
                        alert("新增成功");
                        res.end();
        
        });
        res.end();
})


//建立 server
database.listen(port, () => {
        console.log(`server listen to http://localhost:${port}`)
})

// 關閉連線時呼叫
/*conn.end(function(err){
if(err) throw err;
console.log('connect end');
})*/