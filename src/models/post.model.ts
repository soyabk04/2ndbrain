import mongoose,{Types,Document} from "mongoose";

export interface PostDocument extends Document {
  user:Types.ObjectId;
  title: string;
  content: string;
  tags: Types.ObjectId[];
}
const postSchema=new mongoose.Schema<PostDocument>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    }
    ,tags:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'tag'
    }]
},  {
    timestamps: true
  })
export const postModel=mongoose.model('post',postSchema)

