const mongoose=require ('mongoose');
//define the mongodb connection url
const mongoURL='mongodb://localhost:27017/hotels'//replace 'my database' with your database name
//setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
//get the default connection
//mongoose maintains a default connection object represtying the mongodb connection
const db=mongoose.connection;
//define event listeners for database connection
db.on('connected',()=>{
    console.log('connected to mongodb server')
})
db.on('error',(err)=>{
    console.error('mongodb connection error:',err);
});
db.on('disconnected',()=>{
    console.log('mongodb disconnected');
});

//expot database connection
module.exports=db;