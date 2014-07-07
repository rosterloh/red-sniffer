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
    httpAdminRoot: "/", //"/red",
    httpNodeRoot: "/api",
    userDir: __dirname+'/.nodered',
    //nodesDir: __dirname+'/nodes'
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(process.env.PORT || 8000);

// Start the runtime
RED.start();
