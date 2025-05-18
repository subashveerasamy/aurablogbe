 import mongoose from 'mongoose';
 import {format} from 'date-fns'

 const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt:{
         type: String,
        default: format(new Date(), 'yyyy-MM-dd')
    }
 },{versionKey:false});

 const users= mongoose.model('users', userSchema);
 export default users;
