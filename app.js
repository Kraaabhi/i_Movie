const express=require('express');
const request =require('request');
const app= express();
app.set("view engine","ejs");


app.use('/public',express.static('public'));


app.get('/',(req,res)=>{
    res.render("home");
})
app.get('/result',(req,res)=>{
    const url=`http://www.omdbapi.com/?apikey=13a2d305&s=${req.query.movieName}`;
     request( url , (error,response,body)=>{
        if(!error&&response.statusCode===200){
              const data= JSON.parse(body);
              res.render("result",{moviesDump:data});
        }
        else{
            res.send('something went wrong');
        }
     })
});
app.get('/result/:id',(req,res)=>{
    const url=`http://www.omdbapi.com/?apikey=13a2d305&i=${req.params.id}`;
     request( url , (error,response,body)=>{
        if(!error&&response.statusCode===200){
              const data= JSON.parse(body);
             res.render("detail",{movie:data});
        }
        else{
            res.send('something went wrong');
        }
     })
});
app.get('*',(req,res)=>{
    res.send('404 not found')
})
app.listen(3000,()=>{
    console.log('server started');
});