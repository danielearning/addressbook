(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";angular.module("addressBookApp",["ngRoute","addressBookUtils","addressBookServices","addressBookDemo","addressBookControllers","addressBookAnimations"]).config(["$routeProvider",function(e){e.when("/about",{templateUrl:"views/about.html",controller:"AddressGlobalCtl"}).when("/entries",{templateUrl:"views/entrylist/list.html",controller:"AddressListCtl"}).when("/entries/edit",{templateUrl:"views/entrylist/list.html",controller:"AddressListEditCtl"}).when("/entries/new",{templateUrl:"views/edit/form.html",controller:"AddressNewCtl"}).when("/entries/:entryId",{templateUrl:"views/edit/view.html",controller:"AddressDetailCtl"}).when("/entries/:entryId/edit",{templateUrl:"views/edit/form.html",controller:"AddressEditCtl"}).when("/entries/:entryId/delete",{templateUrl:"views/edit/view.html",controller:"AddressDeleteCtl"}).otherwise({redirectTo:"/entries"})}]).directive("ngUpdateHidden",function(){return function(e,t,r){var l=r.ngModel;e.$watch(l,function(e){t.val(e)})}}).directive("ngUpdateTypeahead",function(){return function(e,t,r){var l=r.ngModel;e.$watch(l,function(e){$(r.ngUpdateTypeahead).typeahead("val",e)})}});

},{}]},{},[1])


//# sourceMappingURL=app.js.map
