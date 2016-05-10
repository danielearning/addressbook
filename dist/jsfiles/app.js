'use strict';

// Declare app level module which depends on views, and components

angular.module('addressBookApp', ['ngRoute', 'ngAnimate', 'addressBookUtils', 'addressBookServices', 'addressBookDemo', 'addressBookControllers', 'addressBookAnimations']).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AddressGlobalCtl'
  }).when('/entries', {
    templateUrl: 'views/entrylist/list.html',
    controller: 'AddressListCtl'
  }).when('/entries/edit', {
    templateUrl: 'views/entrylist/list.html',
    controller: 'AddressListEditCtl'
  }).when('/entries/new', {
    templateUrl: 'views/edit/form.html',
    controller: 'AddressNewCtl'
  }).when('/entries/:entryId', {
    templateUrl: 'views/edit/view.html',
    controller: 'AddressDetailCtl'
  }).when('/entries/:entryId/edit', {
    templateUrl: 'views/edit/form.html',
    controller: 'AddressEditCtl'
  }).when('/entries/:entryId/delete', {
    templateUrl: 'views/edit/view.html',
    controller: 'AddressDeleteCtl'
  }).when('/error404', {
    template: '<h1>404 Not found :(</h1>'
  }).otherwise({ redirectTo: '/entries' });
}]).directive('ngUpdateHidden', function () {
  return function (scope, el, attr) {
    var model = attr['ngModel'];
    scope.$watch(model, function (nv) {
      el.val(nv);
    });
  };
}).directive('ngUpdateTypeahead', function () {
  return function (scope, el, attr) {
    var model = attr['ngModel'];
    scope.$watch(model, function (nv) {
      //console.log(el, el[0], $(el[0]), nv);
      $(attr['ngUpdateTypeahead']).typeahead('val', nv);
    });
  };
});