const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');
const app=express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const db=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'book_db',
        port:3306
});

// check databse connection

db.connect(err=>{
    if(err )
    {
        console.log(err,'DATABASE ERROR');
    }
    else
    {
        console.log("database connected");
    }
})


// get all data
app.get('/user',(req,res)=>{
    let qr=`select * from book_details`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,"error");
        }
        if(result.length>0)
        {
            res.send({
                message: 'all books details',
                data:result
            })
        }
        else{
            res.send({message:'no data'})
        }
    });
});
 
// get single data
app.get('/user/:id',(req,res)=>{
    let bid=req.params.id;
    let qr=`select * from book_details where id = ${bid}`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,"error");
        }
        if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message:'data not found',
            })
        }
    });
});

//post data
app.post('/user',(req,res)=>{
    let bookname=req.body.book_name;
    let bookauthor=req.body.book_author;
    let price=req.body.book_price;
    let qr = `insert into book_details(book_name,book_author,book_price) values('${bookname}','${bookauthor}','${price}')`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            res.send({message:"book name already exits"});
            console.log(err,"error");
        }
        else
        {
            res.send({message:"Data inserted succesfully"});
        }
    });
});


// update data
app.put('/user/:id',(req,res)=>{
    let bid=req.params.id;
    let bookname=req.body.book_name;
    let bookauthor=req.body.book_author;
    let price=req.body.book_price;
    // console.log(bid,bookname,bookauthor,price);
    let qr= `update book_details set book_name='${bookname}',book_author='${bookauthor}',book_price='${price}' where id=${bid}`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            res.send({message:'error in update'});
            console.log(err,"error");
        }
        else
        {
            res.send({message:'data updated'});
        }
    });
});

app.delete('/user/:id',(req,res)=>{
    let bid=req.params.id;
    let qr=`delete from book_details where id=${bid}`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            res.send({message:'data not present'});
            console.log(err,"ERROR");
        }
        else
        {
            console.log(bid);
            res.send({message:'data deleted'});
        }
    });
});

app.listen(4000,()=>{
    console.log('server running at port 4000');
});