(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function createListController(e){return["$scope","AddressBook",function(t,o){t.entries=o.query(),t.orderBy="lastname",t.view="listview",e.edit?(t.view="tableview",t.listViewActive="",t.tableViewActive="active",t.edit="edit"):(t.view="listview",t.listViewActive="active",t.tableViewActive="",t.edit=""),t.setListView=function(){t.view="listview",t.listViewActive="active",t.tableViewActive=""},t.setTableView=function(){t.view="tableview",t.listViewActive="",t.tableViewActive="active"},t.sort=function(e){console.log(e),t.orderBy=e}}]}function createEditController(e){return["$scope","$window","$routeParams","countryNameFilter","AddressBook",function(t,o,r,i,n){t.mode=e.mode,"new"===e.mode?t.entry={}:t.entry=n.get({id:r.entryId},function(e){t.countryname=_typeof("function"===i)&&e?i(e.countrycode):"",o&&"function"==typeof o.onEditView&&o.onEditView(t)}),t.saveEntry=function(){t.validationError="",n.save(t.entry,function(e){e?o&&(o.location="#/entries/"+e.id):t.validationError=n.validate(t.entry).err})},t.deleteEntry=function(){n["delete"](t.entry)},o&&"function"==typeof o.onEditView&&o.onEditView(t)}]}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_controllers=angular.module("addressBookControllers",[]);_controllers.controller("AddressListCtl",createListController({edit:!1})),_controllers.controller("AddressListEditCtl",createListController({edit:!0})),_controllers.controller("AddressNewCtl",createEditController({mode:"new"})),_controllers.controller("AddressEditCtl",createEditController({mode:"edit"})),_controllers.controller("AddressDetailCtl",createEditController({mode:"detail"})),_controllers.controller("AddressDeleteCtl",createEditController({mode:"delete"}));

},{}]},{},[1])


//# sourceMappingURL=AddressBookCtl.js.map
