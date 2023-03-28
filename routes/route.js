const express = require('express');
const router = express.Router();
const config = require("../config");

router.get("/test",function test(req, res){
    res.send({status:true , msg:"success"})
    })



const userController = require("../Controllers/userController")
const{registerUserSchema, loginUserSchema}= require("../Middleware/userMiddleware")
const{Authentication}=require("../Auth/Auth")


router.post("/registration",registerUserSchema,userController.userRegistration.bind())
router.post("/loginUser",loginUserSchema,userController.userLogin.bind())
router.post('/chat',userController.chat.bind());
router.get('/getAllDetails',userController.getAllDetails.bind())
router.get('/getUser',userController.getUser.bind())
router.get("/getUserMsg/:id",userController.getUserMsg.bind());
router.get("/fetchMsg/:id", userController.fetchMsg.bind());
router.post("/fetchSentmsg",userController.getMsgSentDetailsById.bind());

router.get('/getIdByName/:name',userController.getIdByName.bind());
module.exports.routes = router;
