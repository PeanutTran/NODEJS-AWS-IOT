#!/usr/bin/env bash
# requires: Nodejs/NPM, PowerShell
# Permission to run PS scripts (for this session only):
# Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# exit if cmdlet gives error
$ErrorActionPreference = "Stop"

# Check to see if root CA file exists, download if not
If (!(Test-Path ".\root-CA.crt")) {
    "`nDownloading AWS IoT Root CA certificate from AWS..."
    Invoke-WebRequest -Uri https://www.amazontrust.com/repository/AmazonRootCA1.pem -OutFile root-CA.crt
}

# install AWS Device SDK for NodeJS if not already installed
node -e "require('aws-iot-device-sdk')"
If (!($?)) {
    "`nInstalling AWS SDK..."
    npm install aws-iot-device-sdk
}

"`nRunning pub/sub sample application..."
node .\node_modules\aws-iot-device-sdk-js\examples\device-example.js --host-name a30ovrxliiw32u-ats.iot.ap-southeast-1.amazonaws.com --private-key .\server\config\Meter-001.private.key --client-certificate .\server\config\Meter-001.cert.pem --ca-certificate .\server\config\AmazonRootCA1.pem --client-id=sdk-nodejs-105be209-4a26-4dc5-9382-067a0aa8831a
