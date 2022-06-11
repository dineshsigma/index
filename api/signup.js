let express=require('express');
let router=express.Router();
let {connection}=require('../db');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

let {randomnumbers}=require('../randomnumbers/randomnumbers');

const {
    emailvalidation,
   
  } = require("../validations/email");


createUsers=(user_id,username,email,password)=>{
    return new Promise((resolve,reject)=>{
        var sql="insert into  Users(user_id,username,email,password) values(?,?,?,?)";
        connection.query(sql,[user_id,username,email,password],(err,results)=>{
            if(err){
                return reject(err)
            }
            else{
                return resolve(results);
            }
        })
    })

}



router.post('/user',emailvalidation,async (req,res)=>{
    try{

        let user_id=randomnumbers(10);
        let username=req.body.username;
        let email=req.body.email.trim();
        let password=req.body.password.trim();
        let hashedpassword=hashSync(password,10);
       


        let postuser= await createUsers(user_id,username,email,hashedpassword);
        res.json({
            status:true,
            message:'User Created Successfully',
            data:postuser
        })
        

    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})





module.exports = router;