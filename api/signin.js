let express=require('express');
let router=express.Router();
let {connection}=require('../db.js');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");


userlogin=(email,password)=>{
    return new Promise((resolve,reject)=>{
        var sql="select password,userid,access_level from Users where email=?";
        connection.query(sql,[email],(err,results)=>{
            if(results.length > 0){
                let compare= compareSync(results[0].password,password);
                if(compare){
                    let user={"email":email,"password":password};
                    const token = jwt.sign(user, process.env.TOKENREGISTER, {
                        expiresIn: "1hr",
                      });
                      let response={
                          message:'LOGIN SUCCESS',
                          token:token,
                          userid:results[0].userid,
                          access_level:results[0].access_level
                          
                      }

                      return resolve(response);




                }
                else{

                    return reject('Invalid password')

                }

            }
            else{
                return reject('USER DOES NOT EXITS')
            }

        })

    })
}

router.post('/login',async (req,res)=>{
    try{
        let email=req.body.email.trim();
        let password=req.body.password.trim();

        let login= await userlogin(email,password);
        if(login.access_level===0){
            req.session.USERID=login;
        }
        else{
            req.session.ADMIN=login;
        }



        res.json({
            status:true,
            message:'Login successfully'
        })

    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
        
    }
})






module.exports=router;