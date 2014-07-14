'use strict';

/* Directives */

angular.module('snifferApp.directives', []).
  directive('appVersion', ['version', function(version) {
    //return function(scope, elm, attrs) {
    return function(scope, elm) {
      elm.text(version);
    };
  }]).
  directive('visGraph', [function() {
    // define constants and helpers used for the directive
    return {
      restrict: 'AE',
      scope: { // attributes bound to the scope of the directive
        data: '=data',
        groups: '=groups',
        options: '=options',
        event: '@event',
        callback: '&'
      },
      link: function(scope, element, attrs) {
        // initialization, done once per my-directive tag in template. If my-directive is within an
        // ng-repeat-ed template then it will be called every time ngRepeat creates a new copy of the template.
 	      var container = element[0];
        // Create a Timeline
        //var timeline = new vis.Timeline(container, data, options);
        var timeline = new vis.Timeline(container);
        timeline.setOptions(scope.options);
        timeline.setGroups(scope.groups);
        timeline.setItems(scope.data);

        var start = new Date((new Date()).getTime());
        var end = new Date((new Date()).getTime() + 1 * 60 * 1000);
        timeline.setWindow(start, end); /* Set initial view to around current time...*/

        var buildGraph = function(scope) {
           //var graph = null;
           //graph = new vis.Network(container, scope.data, scope.options);
           return timeline.on(scope.event, function(properties) {
             if (properties.nodes.length !== 0) {
               scope.callback({params: properties});
             }
           });
        };
        // whenever the bound 'exp' expression changes, execute this
        scope.$watch('data', function(newVal, oldVal) {
          //console.log(newVal);
          // ignore first call which happens before we even have data
          if (newVal === oldVal) {
            return;
          }
          //buildGraph(scope);
        });
      }
    };
  }]);
