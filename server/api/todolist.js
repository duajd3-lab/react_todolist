// server -> todolist.js
const express = require('express')
const ObjectId = require('mongodb').ObjectId;
const { getDB } = require('../db/db_todolist');
const todolist = express.Router(); //페이지 분리


//http://localhost:4000/todo/completed
todolist.get('/', async (req, res) => { 
  const sort = req.query.sort; 
     
  let filter;
  switch(sort){
    case 'false' :  filter={isdone:false};break;
    case 'true' : filter={isdone:true}; break;
    default:filter ={};
  }

   try{
     //실데이터가 들어있는 콜렉션 조회
     const data = await getDB().collection('todos').find(filter).toArray();
     res.send(data)
   } 
   catch(err){
    res.send(err)
   }

})

// api 서버
todolist.post('/', async (req, res) => {  
  try{
    const result = await getDB().collection('todos').insertOne(req.body);
    const data = {...req.body, _id:result.insertedId}
    res.send({success:true, data})

  } 
  catch(err){
    res.send({success:false, msg:err.message})
  }

})


// 삭제
todolist.delete('/', async (req, res) => {  
  const {id} = req.query;
  console.log(id);
  
  try{
    const result = await getDB().collection('todos').deleteOne({_id:new ObjectId(id)}); 
    res.send({success:true});

  } 
  catch(err){
    res.send({success:false, msg:err.message});
  }

})


// 완료
todolist.put('/state', async (req, res) => {  
  const {id} = req.query;
  const {isdone} = req.body;
  console.log(id, isdone);
  
  try{
    const result = await getDB().collection('todos').updateOne({_id:new ObjectId(id)}, {$set: req.body});
    res.send({success:true});
  } 
  catch(err){
    res.send({success:false});
  }

})


module.exports = todolist;