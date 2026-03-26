// server
//const uri = "mongodb+srv://duajd3_db_user:2WRTrfxBGwlUgSO8@cluster0.qeieqrj.mongodb.net/?appName=Cluster0"

const  { MongoClient }  =  require ( 'mongodb' ) ;
const uri = "mongodb://duajd3_db_user:2WRTrfxBGwlUgSO8@ac-hqiinov-shard-00-00.qeieqrj.mongodb.net:27017,ac-hqiinov-shard-00-01.qeieqrj.mongodb.net:27017,ac-hqiinov-shard-00-02.qeieqrj.mongodb.net:27017/?ssl=true&replicaSet=atlas-q15rz6-shard-0&authSource=admin&appName=Cluster0";
const  client  =  new  MongoClient ( uri ) ;

//const 대신 let 선언
let db ;

async function connectDB(){
    try{
        await client.connect();  //몽고디비 접속
        db = client.db('todolist');  //프로젝트db 활성화
        console.log('접속완료');

    }
    catch(err){
        console.error(err)
    }
    
}

function getDB(){
    return db;
}



module.exports = {connectDB, getDB}