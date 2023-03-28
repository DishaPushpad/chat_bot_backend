const userModel = require("../Models/userModel");
const {validationResult} = require('express-validator')
const JWT =   require("jsonwebtoken");
const e = require("express");
// const {  } = require("express-validator");
const userRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        status: false,
        data: `${errors.errors[0].msg}`,
      });
    }
    let data = req.body;
    // console.log(data);
    let registration = await userModel.registration(data);
    if (registration) {
      return res.status(201).send({ status: true, data: "Successs" });
    } else {
      return res
        .status(400)
        .send({ status: true, data: "Something Went Wrong" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

const userLogin = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({
        status: false,
        data: `${errors.errors[0].msg}`,
      });
    }
   let email = req.body.email;
    let password = req.body.password;
    let checkEmail = await userModel.checkEmail(email , password);
 
    if (checkEmail.length>0) {
      let Token = JWT.sign({
        userId:checkEmail[0].id
      },"jwtSecretKey")
      res.setHeader("x-api-key", Token)
      
      return (res.status(200).send({
        status: true,
        data:"Success" ,
        token:Token ,
      user:checkEmail}))
      } else {
      return res.status(404).send({
        status: false,
        data: "invalid emailId and password ",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};


const chat = async function( req, res){
try{
let data = req.body
let id = req.body.receiver

let checkUserById =await userModel.checkUserById(id)
// console.log(checkUserById)
if(checkUserById.length>0){
let chatRegister = await userModel.chatRegister(data)
if(chatRegister){
  return res.status(201).send({status:true, data:"Successfully",data:data})
}else{
  return res.status(400).send({status:false , data:" Something Went Wrong"})
}
 }else{ return res.status(404).send({status:false , msg :"no data found by this id"})}
 }catch(err){
     return res.status(500).send({status: false , error:err.message})
  }
 }

 const getAllDetails = async function(req, res){
  try{
const getAllDetails = await userModel.getAllDetails()
if(getAllDetails){
   return res.status(200).send({status:true, data:getAllDetails  })
}else{ return res.status (400).send({status: false , data:"Something Went Wrong" })}

  }catch(err){
     return res.status(500).send({status:false , error :err.message})
  }
 }

 
  const getUser = async function (req, res){
    try{
      const getAllDetails = await userModel.getDetails()

      if(getAllDetails){
        return res.status(200).send({status:true, msg:"Successfull" , data:getAllDetails})
      }else{
        return res.status(400).send({status:false , data :"Something went Wrong "})
      }
    }catch(err){
      return res.status(500).send({status:false , error:err.message})
    }
  }

  const getUserMsg = async function(req, res){
    try{

      let id = req.params.id;
      const getDetailsById = await userModel.getDetailsById(id)
      if(getDetailsById.length>0){
        return res.status(200).send({status:true , msg:"successfull" , data:getDetailsById})
      }else{ 
        return res.status(404).send({status:false , msg :"no data found by this id"})
      }
    }catch(err){
        return res.status(500).send({status:false , error:err.message})
      }
    }
  

     const fetchMsg= async function (req, res){
      try{
        let id = req.params.id;
        const fetchMsgById = await userModel.fetchMsgById(id)
      if(fetchMsgById.length>0){
        return res.status(200).send({status:true , msg:"successfull" , data:fetchMsgById})
      }else{ 
        return res.status(404).send({status:false , msg :"no data found by this id"})
      }
      }catch(err){
        return res.status(500).send({status:false , error:err.message})
      }
     }

     const getIdByName = async function (req,res){
      try{
let name = req.params.name;
const fetchId=await userModel.fetchId(name)
if(fetchId){
  return res.status(200).send({status:true , msg :"Successfull" , data:fetchId})
}else{
  return res.status(400).send({status:false , msg :"Something went wrong"})
}
      }catch(err){
        return res.status(500).send({status:false , error:err.message})
      }
     }

const getMsgSentDetailsById = async (req,res)=>{
  try{
    let senderId = req.body.senderId
    let receiverId = req.body.receiverId

const getDetailsSent = await userModel.getDetailsSent(senderId,receiverId)
if(getDetailsSent.length>0){
  return res.status(200).send({status: true, data:getDetailsSent})
}else{
  return res.status(200).send({status: false , msg :"No Data Found"})
}


  }catch(err){return res.status(500).send({status: false , error:err.message})}
}




module.exports.userRegistration = userRegistration;
module.exports.userLogin = userLogin;
module.exports.chat = chat;
module.exports.getAllDetails = getAllDetails;
module.exports.getUser = getUser;
module.exports.getUserMsg = getUserMsg;
module.exports.fetchMsg = fetchMsg;
module.exports.getIdByName = getIdByName;
module.exports.getMsgSentDetailsById = getMsgSentDetailsById;


// insert into product (pin,pin_spaces	) values ("QHRGMZ43KHWISF4","QHRGM Z43KH WISF4"),("S6HCFUWQMPS7HV6","S6HCF UWQMP S7HV6 ")