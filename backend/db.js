const mongoose=require('mongoose')

const mongoURI="mongodb+srv://mayank1223:mayank1223@cluster0.1cvfq.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("connected to mongo successfully");
    }).catch((err)=>console.log("no connection"))
}
module.exports=connectToMongo;
