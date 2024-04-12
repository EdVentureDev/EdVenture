import  express  from 'express';
import zod from "zod"
import argon from "argon2"
import { User } from '../db';
const router = express.Router();

async function hashPassword(password : string)    {
    return await argon.hash(password)
}

async function passwordVerify(hashedPassword: string, plainPassword: string)    {
    return await argon.verify(hashedPassword, plainPassword)
}

const signUpBody = zod.object({
    name: zod.string(),
    username: zod.string(),
    email: zod.string(),
    educational_institute: zod.string(),
    password: zod.string()
})

router.post("/signup",async function(req,res)   {
    const body = req.body;

    const parsedBody = signUpBody.safeParse(body);

    if(!(parsedBody.success))   {
        return res.status(400).json({
            msg: "Invalid Format"
        })
    }

    const existingUser = await User.findOne({username:body.username})
    if(existingUser)    {
        return res.status(400).json({
            msg: "User Already Exists"
        })
    }

    const rawPassword = body.password
    const hashedPassword = await hashPassword(rawPassword)

    const newUser = new User({
        name: body.name,
        username: body.username,
        email: body.email,
        educational_institute: body.educational_institute,
        password: hashedPassword
    })
    newUser.save();
    res.status(200).json({
        msg: "User Created Successfully"
    })

})


const signInBody = zod.object({
    username: zod.string(),
    password: zod.string()
})

router.post("/signin",async function(req,res)    {
    const body = req.body;
    const parsedBody = signInBody.safeParse(body)
    
    if(!(parsedBody.success))    {
        return res.status(403).json({
            msg: "Invalid Format"
        })
    }

    const findUser = await User.findOne({username: body.username}).select('+password')

    const hashedPassword = findUser?.password
    if(findUser == null)   {
        return res.status(404).json({
            msg:"User Not Found"
        })
    }

    if (hashedPassword!=undefined && !(await passwordVerify(hashedPassword, body.password))) {
        return res.status(404).json({
          msg: "Invalid Password",
        });
      } 
    else    {
        return res.status(200).json({
            msg:"Log In Success"
        })
    }
})

export default router;