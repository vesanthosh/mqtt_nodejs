var mqtt = require('mqtt');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://user:password@192.168.99.100:27017/mqtt_db';
var client  = mqtt.connect('mqtt:192.168.99.100');
 
client.on('connect', function () {
        client.subscribe('test/data');
});

client.on('message',function(topic,message){
var mqtt_data = message.toString();
MongoClient.connect(mongoURI,{ useNewUrlParser: true },(err,client)=>{
        if(err) throw err;
        const db = client.db('mqtt_db');
        const collection = db.collection('mqtt_test_data');
        collection.insertOne({topic: topic,data: mqtt_data,date: new Date()}, (err, result)=>{
                if(err) throw err;
                console.log(result.ops[0]);
        });
});
});