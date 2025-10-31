 import mysql from "mysql2"
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})

db.connect(err=>{
    if(err) throw err;
    console.log("database connected!")
})
console.log("DB USER:", process.env.DB_USER);
console.log("DB PASSWORD:", process.env.DB_PASSWORD);


export default db;