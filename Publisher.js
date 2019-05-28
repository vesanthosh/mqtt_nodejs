var mqtt = require('mqtt')
var client = mqtt.connect('mqtt:192.168.99.100')

client.on('connect', function () {
    setInterval(function () {
        client.publish('node/js/data', 'test data ' + Date.now(), { qos: 2, retain: true });
        console.log('message sent')
    }, 3000);
});