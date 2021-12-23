let admin=require('firebase-admin');
let express=require('express');
let router=express.Router();
let serviceAccount=require('./dinesh-e219e-firebase-adminsdk-p6kr6-5ac4634838.json');

admin.initializeApp({
    credential:admin.credential.cart(serviceAccount)
})



router.post('/insert',async (req,res)=>{
    
})

module.exports=router;