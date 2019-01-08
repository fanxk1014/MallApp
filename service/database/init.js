const mongoose = require('mongoose')
const db = 'mongodb://localhost/mall-db'

exports.connect=()=>{
    //连接数据库
    mongoose.connect(db);

    let maxConnectTimes = 0;

    return new Promise((resolve,reject)=>{
        
        mongoose.connection.on('disconnected',()=>{
            console.log('************数据库错误************');
            //进行重连
            if(maxConnectTimes<=3){
                maxConnectTimes++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库错误，无法连接，请管理员处理')
            }
            
        })

        //数据库报错
        mongoose.connection.on('error',err=>{
            //进行重连
            if(maxConnectTimes<=3){
                maxConnectTimes++;
                mongoose.connect(db);
            }else{
                reject(err);
                console.log('************数据库错误************');
            }
        
        })

        //连接成功打开
        mongoose.connection.once('open',()=>{
            console.log('mongodb connected successfully.');
            resolve();
        })
    })

    

}