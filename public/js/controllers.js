'use strict';

/* Controllers */

angular.module('snifferApp.controllers', []).
    controller('MonitorController', ['$scope', '$window', 'socket', function($scope, $window, socket) {
      $scope.startup = Date.now();
      $scope.callbackFunction = function(params) {
        $window.alert( angular.toJson(params) );
      };
      $scope.graph = {
        error: 0,
        data: {},
        options: {
          'width': '100%',
          'height': '600px',
          'groupOrder': 'content' // groupOrder can be a property name or a sorting function
        }
      };
      var payloadoffset = 5;
      var header_len = 0;
      var ffIndex = 0;
      var deltaTime = 0;
      var index = 0;
      var groupID = 0;
      var arrayType=["unknown","wb","dock","clip"];
      socket.subscribe(function(data) {
        angular.forEach(data, function(value, key) {
          console.log('Value: '+value+' Key: '+key);
        })
        //console.log('Got message: '+data);
        /*
        ffIndex = 0;
        for(var i=0; i<data.length;i++)
        { // search for four consecutive form feed characters, which will indicate a sync loss
          if(data[i] === 12) {//formfeed
            if( (data[i+1] === 12) &&
                (data[i+2] === 12) &&
                (data[i+3] === 12) ) {
                  ffIndex = i+3+1;
                  console.log('sync loss at: '+ffIndex);
                  //io.emit('syncloss', {id: index++, time: Date.now()});
                  $scope.startup = Date.now();
            }
          }
        }

        if(ffIndex > data.length) {
          return;
        }

        header_len = data[ffIndex];

        // Generate timestamps from incoming data....
        var timeStamp = data.readUInt32LE(ffIndex+1,true);
        if(timeStampFirstPacket === 0) {
          timeStampFirstPacket = timeStamp;
        }
        if(ffIndex > 0) {
          //io.emit('syncLoss', {time:Date.now()});
          timeStampFirstPacket = timeStamp;
        }
        deltaTime = timeStamp - timeStampFirstPacket;

        payloadoffset = header_len+1+ffIndex;

        var deviceID = data.readUInt32LE(payloadoffset+3,true);
        var pktTxTime = Math.round((data.readUInt8(payloadoffset, true) +1) * (1/4.8));

        var type = 0;
        var command = data[payloadoffset+1];
        if(command<160) {
          type = 1;
        } else if (command <208) {
          type = 3;
        } else if (command<224){
          type = 2;
        }

        console.log('group: '+deviceID+' devType: '+$scope.arrayType[type]+' startTime: '+(startup+deltaTime)+' deltaTime: '+pktTxTime+' buffer: '+data.slice(payloadoffset, data.length).toString('hex'));
        //$scope.messages.push(data);
        //$scope.$apply();
        */

      });
      socket.connect();
    }]).
    controller('ConfigController', ['$scope', function($scope) {
      $scope.footer = 'Configuration settings';
    }]);
