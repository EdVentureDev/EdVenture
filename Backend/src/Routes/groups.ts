import express from "express";
import zod from "zod";
import { Group, User } from "../db";
const router = express.Router();

router.get("/allgroups", async function (req, res) {
  const groups = await Group.find();
  res.send(groups);
});

const createGroupBody = zod.object({
  username: zod.string(),
  groupName: zod.string(),
  members: zod.array(zod.string()),
});

router.post("/createGroup", async function (req, res) {
  const body = req.body;
  const parsedBody = createGroupBody.safeParse(body);
  if (!parsedBody.success) {
    return res.status(400).json({
      msg: "Invalid Format",
    });
  }
  const existingGroup = await Group.findOne({ groupName: body.groupName });
  if (existingGroup) {
    return res.status(400).json({
      msg: "Group Already Exists",
    });
  }

  const newGroup = new Group({
    createdBy: body.username,
    groupName: body.groupName,
    members: body.members,
    messages: {
      sentBy: body.username,
      content: "GROUP CREATED",
      time: new Date(),
    },
  });
  newGroup.save();

  const updateUser = await User.updateMany(
    { username: { $in: body.members } },
       {
         $addToSet:{
          groups: body.groupName
        }
       }   
  )

  res.status(200).json({
    msg: "Group Created Successfully",
  });
});

const addMembersBody = zod.object({
  groupName: zod.string(),
  from: zod.string(),
  members: zod.array(zod.string()),
});

router.put("/addMembers", async function (req, res) {
  const body = req.body;
  const parsedBody = addMembersBody.safeParse(body);

  if (!parsedBody.success)
    return res.status(400).json({
      msg: "Invalid Format",
    });

  const checkAdmin = await Group.findOne({ groupName: body.groupName }).select(
    "+createdBy"
  );
  if (checkAdmin?.createdBy != body.from)
    return res.status(400).json({
      msg: "You are not an admin!",
    });
  
    const updateGroup = await Group.updateOne({groupName:body.groupName},{
      $addToSet: {
        members: {$each: body.members}
      }
    })
    

    const updateUser = await User.updateMany(
      { username: { $in: body.members } },
         {
           $addToSet:{
            groups: body.groupName
          }
         }   
    )

    return res.status(200).json({
      msg: "Members added Successfully!"
    })
});

const removeMembersBody = zod.object({
  groupName: zod.string(),
  from: zod.string(),
  members: zod.array(zod.string())
})

router.get("/getmsgs",async function(req,res) {
  const username = req.query.loggedInUsername
  
  const getmsg = await Group.findOne({groupName:"Group2"})
  res.status(200).json({
    msgs: getmsg?.messages
  })
})

router.put("/removeMembers", async function (req, res) {
  const body = req.body;
  const parsedBody = removeMembersBody.safeParse(body);

  if (!parsedBody.success)
    return res.status(400).json({
      msg: "Invalid Format",
    });

  const checkAdmin = await Group.findOne({ groupName: body.groupName }).select(
    "+createdBy"
  );

  if (checkAdmin?.createdBy !== body.from)
    return res.status(400).json({
      msg: "You are not an admin!",
    });

  const updateGroup = await Group.updateOne(
    { groupName: body.groupName },
    {
      $pull: {
        members: { $in: body.members }
      }
    }
  );

  const updateUser = await User.updateMany(
    { username: { $in: body.members } },
    {
      $pull: {
        groups: body.groupName
      }
    }
  );

  return res.status(200).json({
    msg: "Members Removed Successfully"
  })
})


const msgGroupBody = zod.object({
  groupName: zod.string(),
  from: zod.string(),
  content: zod.string(),
});

router.put("/msgGroup", async function (req, res) {
  const body = req.body;
  const parsedBody = msgGroupBody.safeParse(body);

  if (!parsedBody.success) {
    return res.status(400).json({
      msg: "Invalid Format",
    });
  }

  const { groupName, from, content } = req.body;
  const checkUser = await Group.findOne({
    groupName: groupName,
    members: { $in: [from] },
  });

  if (!checkUser) {
    return res.status(400).json({
      msg: "User Does not exist in Group",
    });
  }

  var updateMessages = await Group.updateOne(
    { groupName: groupName },
    {
      $push: {
        messages: {
          sentBy: from,
          content: content,
        },
      },
    }
  );
  res.status(200).json({
    msg: "Message send Success!",
  });
});

export default router;
