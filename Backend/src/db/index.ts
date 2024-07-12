require('dotenv').config();
import mongoose from "mongoose";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

mongoose.connect(databaseUrl)
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
