'use strict';

/* Controllers */

angular.module('snifferApp.controllers', []).
    controller('MonitorController', ['$scope', '$window', 'socket', function($scope, $window, socket) {
      $scope.callbackFunction = function(params) {
        $window.alert( angular.toJson(params) );
      };
      // Create a DataSet with data (enables two way data binding)
      $scope.data = new vis.DataSet();
      $scope.groups = new vis.DataSet({id:'SyncLoss'});
      $scope.graph = {
        error: 0,
        options: {
          //'width': '100%',
          //'height': '600px',
          'groupOrder': 'content' // groupOrder can be a property name or a sorting function
        }
      };
      var groupList = [];
      socket.subscribe(function(data) {
        var msg = JSON.parse(data);
        if(groupList.indexOf(msg.group) === -1) {
          // New group that we haven't seen before
          var newGroup = [];
          newGroup.push({id:msg.group});
          //$scope.graph.data.groups.push(newGroup);
          $scope.groups.add(newGroup);
          //also add to our local groupList array
          groupList.push(msg.group);
        }
        var newData = [];
        newData.push({
          id: msg.id,
          group: msg.group,
          content: msg.devType,
          start: msg.startTime,
          end: msg.startTime+msg.deltaTime,
          className: msg.devType,
          text: msg.buffer
        })

        //$scope.graph.data.nodes.push(newData);
        $scope.data.add(newData);
        $scope.$apply();
      });
      $scope.clearLog = function() {
        $scope.data = new vis.DataSet();
        $scope.groups = new vis.DataSet({id:'SyncLoss'});
      };
      socket.connect();
    }]).
    controller('ConfigController', ['$scope', function($scope) {
      $scope.footer = 'Configuration settings';
    }]).
    controller('EepromController', ['$scope', '$http', function($scope, $http) {
      $http.get('/api/eeprom').success(function(data) {
        $scope.WB_EEPROM = data;
        console.log(data);
      });
    }]).
    controller('UbinController', ['$scope', function($scope) {
      $scope.footer = 'Configuration settings';
    }]).
    controller('TrackerController', ['$scope', function($scope) {
      $scope.footer = 'Configuration settings';
    }]);
