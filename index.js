'use strict';

var http       = require('http');
var express    = require('express');
var RED        = require('node-red');
var serial     = require('serialport');
var mongo      = require('mongodb');

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use(express.static(__dirname + '/public'));

// Create a server
var server = http.createServer(app);

// Create the settings object
var settings = {
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  httpStatic: '/',
  userDir: __dirname+'/.nodered',
  nodesDir: __dirname+'/nodes',
  flowFile: 'flows.json',
  verbose: true,
  functionGlobalContext: {
    MS_PER_BYTE:1/4.8,
    arrayType: ['unknown','wb','dock','clip'],
    index:0,
    timeStampFirstPacket:0,
    startup:Date.now()
  }
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(process.env.PORT || 80);

// Start the runtime
RED.start();
