import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Trishank:iqv6js8Fi6CUBOkF@cluster0.e8cglhl.mongodb.net/EdVenture')

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
