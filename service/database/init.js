const mongoose = require('mongoose')
const db = 'mongodb://localhost/mall-db'

exports.connect=()=>{
    //连接数据库
    mongoose.connect(db);

    mongoose.connection.on('disconnected',()=>{
        //进行重连
        console.log('*******************数据库错误');
        mongoose.connect(db);
    })

    //数据库报错
    mongoose.connection.on('error',err=>{
        console.log('*******************数据库错误');
        console.log(err);
        mongoose.connect(db);
    })

    //连接成功打开
    mongoose.connection.once('open',()=>{
        console.log('mongodb connected successfully.')
    })

}