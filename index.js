const exec = require("exec");
const express = require("express");
const mqtt = require("mqtt");
const config = require("./config.json");

const app = express();
const MQTTclient = mqtt.connect(config.mqtt.server);

const mqttConnect = () => {
  MQTTclient.subscribe("door/#");
};

const mqttMessage = (topic, message) => {
  switch (topic) {
    case "door/outer/opened/username":
      audioCmd = "ogg123 ./audio/entered.ogg";
      break;
    case "door/outer/doorbell":
      audioCmd = "ogg123 ./audio/doorbell.ogg";
      break;
    default:
      audioCmd = "";
  }
  exec(audioCmd, function puts(error, stdout, stderr) {});
};

MQTTclient.on("connect", mqttConnect);
MQTTclient.on("message", mqttMessage);

module.exports = app;
