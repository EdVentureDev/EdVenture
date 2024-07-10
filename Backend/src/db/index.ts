import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));


const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    educational_institute: String,
    password: String,
    groups: [],
    
})

const GroupsSchema = new mongoose.Schema({
    createdBy: String,
    groupName: String,
    members: [],
    messages: [{
        sentBy: String,
        content: String,
        time: Date
    }],
})

const ConversationSchema = new mongoose.Schema({
    first: String,
    second: String,
    msgs:   {

    } 
})

export const User= mongoose.model("User", UserSchema)
export const Group = mongoose.model("Group",GroupsSchema)
export const Convo = mongoose.model("Conversations",ConversationSchema)
