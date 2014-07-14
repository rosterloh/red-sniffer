'use strict';

/* Services */

angular.module('snifferApp.services', []).
  value('version', '0.0.1').
  constant('_', window._).  // lodash
  factory('socket', function() {
    var service = {};

    service.connect = function() {
      if(service.ws) { return; }

      var ws = new WebSocket("ws://mp-3dx6v.buddi.local:8000/api/ws/serial");

      ws.onopen = function() {
        //service.callback("Succeeded to open a connection");
        console.log('Socket opened');
      };

      ws.onerror = function() {
        //service.callback("Failed to open a connection");
        console.log('Socket error');
      }

      ws.onmessage = function(message) {
        service.callback(message.data);
      };

      service.ws = ws;
    }

    service.send = function(message) {
      service.ws.send(message);
    }

    service.subscribe = function(callback) {
      service.callback = callback;
    }

    return service;
  });
