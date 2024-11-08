const express=require('express')
const app=express();
const db=require('./db');
const MenuItem=require('./models/MenuItem');

const bodyParser=require('body-parser');
const router = require('./personRouts');
app.use(bodyParser.json());
app.get('/menu',async(req,res)=>{
    try{
      const data=await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
  
    }
  })
  
  router.post('/menu',async(req,res)=>{
    try{
      const data=req.body
      const newMenu=new MenuItem(data);
      const response=await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'})
    }
  })
  

module.exports=router;