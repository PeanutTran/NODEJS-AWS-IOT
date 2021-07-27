// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT cloud
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//
var jobs = awsIot.jobs({
   keyPath: path.resolve(__dirname, './Meter-001.private.key'),
   certPath: path.resolve(__dirname, './Meter-001.cert.pem'),
   caPath: path.resolve(__dirname, './AmazonRootCA1.pem'),
   debug: true,
   host: 'a30ovrxliiw32u-ats.iot.ap-southeast-1.amazonaws.com',
   clientId: 'Meter-001',
   region: 'ap-southeast-1',
});

//
// Jobs is built on top of awsIot.device and inherits all of the same functionality.
//
jobs
  .on('connect', function() {
    console.log('connect');
    device.subscribe('topic_1');
    device.publish('topic_2', JSON.stringify({ test_data: 1}));
    });

jobs
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });

//
// To subscribe to job execution events call the subscribeToJobs method which takes
// a callback that will be invoked when a job execution is available or an error
// occurs. The job object passed to the callback contains information about the job
// execution and methods for updating the job execution status. Details covered
// in the API documentation below.
//
jobs.subscribeToJobs(thingName, function(err, job) {
   if (isUndefined(err)) {
      console.log('default job handler invoked, jobId: ' + job.id.toString());
      console.log('job document: ' + job.document);
   }
   else {
      console.error(err);
   }
});

jobs.subscribeToJobs(thingName, 'customJob', function(err, job) {
   if (isUndefined(err)) {
      console.log('customJob operation handler invoked, jobId: ' + job.id.toString());
      console.log('job document: ' + job.document);
   }
   else {
      console.error(err);
   }
});

//
// After calling subscribeToJobs for each operation on a particular thing call
// startJobNotifications to cause any existing queued job executions for the given
// thing to be published to the appropriate subscribeToJobs handler. Only needs
// to be called once per thing.
//
jobs.startJobNotifications(thingName, function(err) {
   if (isUndefined(err)) {
      console.log('job notifications initiated for thing: ' + thingName);
   }
   else {
      console.error(err);
   }
});