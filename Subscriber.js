var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt:192.168.99.100')
 
client.on('connect', function () {
        client.subscribe('node/js/data');
});

client.on('message',function(topic,message){
mqtt_data = message.toString();
console.log(mqtt_data);
});