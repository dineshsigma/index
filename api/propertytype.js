let express=require('express');
let router=express.Router();
let {connection}=require('../db');
let {randomnumbers}=require('../randomnumbers/randomnumbers');
let {propertyvalidation}=require('../validations/propertytype')


createPropertyType=(pro_typeid,propertytype,bathrooms,bedrooms)=>{
    return new Promise((resolve,reject)=>{
        let createdOn=new Date();
        var sql="insert into propertyType(pro_typeid,propertytype,bathrooms,bedrooms,createdOn) values(?,?,?,?,?)";
        connection.query(sql,[pro_typeid,propertytype,bathrooms,bedrooms,createdOn],(err,results)=>{
            if(err){
                return reject(err);

            }
            else{
                return resolve(results);
            }
        })
    })

}

router.post('/create',propertyvalidation,async(req,res)=>{
    try{
        let pro_typeid=randomnumbers(10);
        let propertytype=req.body.propertytype;
        let bathrooms=req.body.bathrooms || 0;
        let bedrooms=req.body.bedrooms || 0;




        let  postpropertytype= await createPropertyType(pro_typeid,propertytype,bathrooms,bedrooms);

        res.json({
            status:true,
            message:'Property Type is created'
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