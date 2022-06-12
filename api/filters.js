let express=require('express');
let router=express.Router();
let {connection}=require('../db');

searchProperty=(location,area,propertytype)=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from addProperty where location=? and area=? and propertytype=?";
        connection.query(sql,[location,area,propertytype],(err,results)=>{
            if(err){
                return reject(err)
            }
            else{
                return resolve(results);
            }
        })
    })
}

router.post('/filters',async (req,res)=>{
    try{
        let location=req.body.location;
        let area=req.body.area;
        let propertytype=req.body.propertytype;


        let  filterbyproperty= await searchProperty(location,area,propertytype);
        res.json({
            status:true,
            data:filterbyproperty
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