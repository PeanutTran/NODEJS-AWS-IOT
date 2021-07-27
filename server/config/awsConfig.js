var awsIot = require('aws-iot-device-sdk');
const path = require('path');

const thingShadows = awsIot.thingShadow({
  keyPath: path.resolve(__dirname, './Meter-001.private.key'),
  certPath: path.resolve(__dirname, './Meter-001.cert.pem'),
  caPath: path.resolve(__dirname, './AmazonRootCA1.pem'),
  debug: true,
  host: 'a30ovrxliiw32u-ats.iot.ap-southeast-1.amazonaws.com',
  clientId: 'sdk-nodejs-105be209-4a26-4dc5-9382-067a0aa8831a',
  region: 'ap-southeast-1',
});

thingShadows.on('status', (thingName, stat, clientToken, stateObject) => {
  console.log('received '+stat+' on '+thingName+': '+
  JSON.stringify(stateObject));
});

thingShadows.on('connect', () => {
  console.log('Connected to AWS IoT');
});

thingShadows.on('delta',
    function(thingName, stateObject) {
       console.log('received delta on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken);
});

export default thingShadows;