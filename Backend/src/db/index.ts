import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Trishank:iqv6js8Fi6CUBOkF@cluster0.e8cglhl.mongodb.net/EdVenture')

const UserSchema = new mongoose.Schema({
    username: String,
    educational_institute: String,
    password: String
})

const User= mongoose.model("User", UserSchema)

export default User