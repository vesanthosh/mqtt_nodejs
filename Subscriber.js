var mqtt = require('mqtt');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://user:password@192.168.99.100:27017/mqtt_db';
var client = mqtt.connect('mqtt:192.168.99.100');

var collection;

client.on('connect', function () {
        client.subscribe('test/data', { qos: 1 });
        console.log('Topic subscribed')
});

MongoClient.connect(mongoURI, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        const db = client.db('mqtt_db');
        collection = db.collection('mqtt_test_data');
        console.log('Database connected');
});

client.on('message', function (topic, message) {
        var mqtt_data = message.toString();
        collection.insertOne({ topic: topic, data: mqtt_data, date: new Date() }, (err, result) => {
                if (err) throw err;
                console.log(result.ops[0]);
        });
});