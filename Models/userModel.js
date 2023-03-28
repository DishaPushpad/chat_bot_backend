
const config = require('../config');
const mysql = require('mysql2');
const { database } = require('../config');
const pool = mysql.createPool(
	{
		host: config.mysqlHost,
		user: config.user,
		password: process.env.DB_PASS || config.password,
		database: config.database,
		port: config.mysqlPort
	});

const promisePool = pool.promise();

class userModel {

    registration= async(data)=>{
        let sql = `INSERT INTO user_Registration(name,email,password,city) VALUES ('${data.name}','${data.email}','${data.password}','${data.city}')`
        const [result, fields] = await promisePool.query(sql);
		return result;


    }
	checkEmail = async (email , password)=>{
		let sql = `SELECT * FROM  user_Registration WHERE email = '${email}' And password='${password}' `;
		const [result, fields] = await promisePool.query(sql);
        return result;

	}
	
	chatRegister= async (data)=>{
		let sql =`INSERT INTO chat (sender,Receiver,content) values ('${data.sender}','${data.receiver}','${data.content}')`
		const[result,fields] = await promisePool.query(sql);
		console.log(result)
		return result;
	}
	

	getAllDetails = async () => {
		let sql = `SELECT chat.id,chat.sender, chat.Receiver, chat.content,u.name AS Recipient,user_Registration.name AS senderName, DATE_FORMAT(chat.Created_At, '%d/%m/%y %H:%i:%s') AS At  
		FROM chat 
		JOIN user_Registration ON chat.sender = user_Registration.id 
		LEFT JOIN user_Registration AS u ON chat.Receiver = u.id`;
		const [result, fields] = await promisePool.query(sql);
		return result;
	  }
	  

	checkUserById= async (id)=>{
		let sql = `select * from user_Registration where id ='${id}'`;
		const[ result,fields]= await promisePool.query(sql);
		return result
	}
	findById = async(userId)=>{
		let sql = `select * from user_Registration where id ='${userId}'`;
		const[ result,fields]= await promisePool.query(sql);
		return result
	}

	getDetails= async()=>{
		let sql = `select user_Registration.id , user_Registration.name from user_Registration` ;
		const[ result,fields]= await promisePool.query(sql);
		return result
	}
	getDetailsById = async(id)=>{
		let sql = `select chat.content from chat where Receiver ='${id}'`;
		const[ result,fields]= await promisePool.query(sql);
		return result
	}
	fetchMsgById = async(id)=>{
		let sql = `select chat.content from chat where sender ='${id}'`;
		const[ result,fields]= await promisePool.query(sql);
		return result
	}

	fetchId= async (name)=>{
		let sql =`select id from user_Registration where name ='${name}'`;
		const[result,fields]=await promisePool.query(sql);
		return result
	}

	getDetailsSent = async(senderId,receiverId)=>{
		let sql = `select chat.content from chat where sender='${senderId}' AND Receiver ='${receiverId}'`;
		const[result, fields]= await promisePool.query(sql);
		return result
	}
}


 module.exports=new userModel;

