'use strict';

/* Filters */

angular.module('snifferApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);
