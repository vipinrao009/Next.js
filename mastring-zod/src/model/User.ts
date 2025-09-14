import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: String,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerify:boolean,
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptedMessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill in a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerify:{
    type:Boolean,
    default:false
  },
  verifyCode:{
    type:String,
    required:[true, "verify code is required"]
  },
  verifyCodeExpiry:{
    type:Date,
    required:[true,  "verify code expiry is required"]
  },
  isAcceptedMessage:{
    type:Boolean,
    default:false
  },
  message: [messageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel

/* 

1. jab bhi ham typeScript use karate hai to pahele hme data type define padta hai aur type define karne ke kiye interface ek data type hai

2. interface me aap general defination likhte ho ki content jo aayega vo to kaun se type ka hoga  

3. Next js edge par chalta hai so isko nahi pata hota hai ki app first time chal rahi hai ya fir iske pahle bhi chali hai jabki node and express me app me app first time load hone me hi data initiaze ho jata hai isiliye next js me export ka tarika thoda different hota hai 
*/
