import mongoose from 'mongoose';
import { format } from 'date-fns';

const blogsSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
        
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
     createdAt:{
             type: String,
            default: format(new Date(), 'yyyy-MM-dd')
        },
    updatedAt:{
            type:String,
            default:"-"
    }

},{versionKey:false})

const blogs= mongoose.model('blogs',blogsSchema)
export default blogs;