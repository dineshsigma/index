let express=require('express');
let router=express.Router();
let {connection}=require('../db');
let {randomnumbers}=require('../randomnumbers/randomnumbers');



createProperty=(pro_id,propertytitle,status,propertytype,price,description,name,phone,image,location,address,pincode,bathrooms,bedrooms)=>{
    return new Promise((resolve,reject)=>{
        var sql="insert into addProperty(pro_id,propertytitle,status,propertytype,price,description,name,phone,image,location,address,pincode,bathrooms,bedrooms) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        connection.query(sql,[pro_id,propertytitle,status,propertytype,price,description,name,phone,image,location,address,pincode,bathrooms,bedrooms],(err,results)=>{
            if(err){
                return reject(err)
            }
            else{
                return resolve(results)
            }

        })


    })
}

router.post('/create',async (req,res)=>{
    try{
        let pro_id=randomnumbers(10);
        let propertytitle=req.body.propertytitle;
        let status=req.body.status;
        let propertytype=req.body.propertytype;
        let price=req.body.price;
        let description=req.body.description;
        let name=req.body.name;
        let phone=req.body.phone;
        let image=req.file.filename;
        let location=req.body.location;
        let address=req.body.address;
        let pincode=req.body.pincode;
        let bathrooms=req.body.bathrooms;
        let bedrooms=req.body.bedrooms;


        let insertproperty=await createProperty(pro_id,propertytitle,status,propertytype,price,description,name,phone,image,location,address,pincode,bathrooms,bedrooms);

        res.json({
            status:true,
            message:'Property  added successfully'
        })

        




    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})

fetchPropertyType1=(propertytype)=>{
    return new Promise((resolve,reject)=>{
        var sql="select * from addProperty where propertytype=?";
        connection.query(sql,[propertytype],(err,results)=>{
            if(err){
                return reject(err)
            }
            else{
                return resolve(results);
            }

        })
    })
}


router.get('/propertywise/:propertytype',async (req,res)=>{
    try{
        let propertytype=req.params.propertytype;


        let  fetchpropertytype= await fetchPropertyType1(propertytype);

        res.json({
            status:true,
            data:fetchpropertytype
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


