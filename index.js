const express=require("express");
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
const app=express();
app.use(express.json());
app.post("/notify",(req,res)=>{
  const {name,userId,photoUrl,message,token}=req.body;
    admin.messaging().sendToDevice(token,{
        data:{userId:userId,name:name,photoUrl:photoUrl,click_action: "FLUTTER_NOTIFICATION_CLICK"},
        notification:{
            title:`message from ${name}`,
            sound:"default",
            body:message,
            tag:userId,
        }
    },notification_options);
    res.send("sent");
})
app.listen(process.env.PORT,()=>console.log("Server running on port 3000"));