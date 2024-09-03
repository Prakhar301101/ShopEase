const mongoose=require('mongoose');
const {Schema,model} =mongoose;

const userSchema= new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,enum:['male','female','others'],required:true},
    role:{type:String,enum:['customer','admin'],required:true},
},
{
    timestamps:true
})

const userModel=model('user',userSchema);

module.exports=userModel;