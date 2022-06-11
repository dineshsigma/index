const { compareSync, hashSync } = require('bcrypt');
let express=require('express');
let router=express.Router();
let {connection}= require('../db.js');


changepassword=(userid,old_password,new_password,confirm_password)=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from Users where userid=?";
        connection.query(sql,[userid],(err,results)=>{
            let compare_oldpassword=compareSync(results[0].password,old_password);
            if(compare_oldpassword){
                if(new_password==confirm_password){
                    let hashpassword=hashSync(new_password,10);

                    let update_sql='update Users set password=? where userid=?';
                    connection.query(update_sql,[hashpassword,userid],(err,updated_results)=>{
                        if(err) throw err;
                        else{
                            return resolve(updated_results);

                        }
                    })

                }
                else{
                    return reject('new password and confirm password mismatch')
                }

            }
            else{
                return reject('Old Password Mismatch')
            }


        })

    })
}

router.post('/changepassword',async (req,res)=>{
    try{
        let userid=req.session.USERID;
        let old_password=req.body.oldpassword;
        let new_password=req.body.new_password;
        let confirm_password=req.body.confirm_password;

        let insert_change= await changepassword(userid,old_password,new_password,confirm_password);

    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})






module.exports=router;