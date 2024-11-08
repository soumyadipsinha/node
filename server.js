const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON bodies

const Person = require('./models/person');
const MenuItem=require('./models/MenuItem')

app.get('/', function (req, res) {
  res.send('Welcome to my hotel... How can I help you?');
});

// Uncomment if needed
// app.get('/chicken', function (req, res) {
//   res.send('Sure, sir. I would love to serve chicken.');
// });

// Uncomment if needed
// app.get('/idli', (req, res) => {
//   var customized_idli = {
//     name: 'rava idli',
//     size: '10 cm diameter',
//     is_Sambar: true,
//     is_chutney: false
//   };
//   res.send(customized_idli);
//   res.send('Sure, sir. I would love to serve idli');
// });

app.post('/person',async (req, res) => {
  // const data = req.body; // Assuming the request body contains the person data
  // const newPerson = new Person(data);

  // // Save the person to the database
  // newPerson.save((error, savedPerson) => {
  //   if (error) {
  //     console.log('Error saving person:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   } else {
  //     console.log('Data saved successfully');
  //     res.status(200).json(savedPerson);
  //   }
  // });
  try{
  const data = req.body; // Assuming the request body contains the person data
  const newPerson = new Person(data);

  // Save the person to the database
  const response=await newPerson.save()
  console.log('data saved');
  res.status(200).json(response)
  


  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});

  }
});


// get method
app.get('/person',async(req,res)=>{
  try{
    const data=await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})
//post method to add a menu item
app.post('/menu',async(req,res)=>{
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

//get method to add a menu item

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

app.get('/person/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType;
  if(workType=='chef'|| workType=='manager'||workType=='waiter'){
    const response=await Person.find({work:workType});
    console.log('response fetched');
    res.status(200).json(response)
  }else{

    res.status(404).json({error:'Invalid workType'});
  }
}catch(err){
  console.log(err);
  res.status(500).json({error:'Internal server error'});
}
const personRouts=require('./routes/personRouts');
//use the router
app.use('/',personRouts);

const menuRoutes=require('./routes/menuRoutes');
app.use('/',menuRoutes);
  
})
app.listen(3000, () => {
  console.log('Listening on port 3000');
});