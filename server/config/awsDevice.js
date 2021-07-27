var awsIot = require('aws-iot-device-sdk');
const path = require('path');

const device = awsIot.device({
    keyPath: path.resolve(__dirname, './Meter-001.private.key'),
    certPath: path.resolve(__dirname, './Meter-001.cert.pem'),
    caPath: path.resolve(__dirname, './AmazonRootCA1.pem'),
    debug: true,
    host: 'a30ovrxliiw32u-ats.iot.ap-southeast-1.amazonaws.com',
    clientId: 'sdk-nodejs-105be209-4a26-4dc5-9382-067a0aa8831a',
    region: 'ap-southeast-1',
});

device.on('connect', () => {
  console.log('Connected to AWS IoT Device');
  // device.subscribe('topic_3');
  device.publish('topic_2', JSON.stringify({ data: 1}));
});

device.on('message',(topic, payload) => {
    console.log('message', topic, payload.toString());
})

setInterval(() => {
  device.publish('topic_2', JSON.stringify({ message: 'message send from AWS device'}))
}, 10000);

export default device;