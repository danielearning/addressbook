'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _controllers = angular.module('addressBookControllers', []);

function createListController(params) {
  return ['$scope', 'AddressBook', function ($scope, AddressBook) {
    $scope.entries = AddressBook.query();
    $scope.orderBy = 'lastname';
    $scope.view = 'listview'; // || 'tableview';

    if (params.edit) {
      $scope.view = 'tableview';
      $scope.listViewActive = ''; // || '';
      $scope.tableViewActive = 'active'; // || 'active';
      $scope.edit = 'edit';
    } else {
      $scope.view = 'listview';
      $scope.listViewActive = 'active'; // || '';
      $scope.tableViewActive = ''; // || 'active';
      $scope.edit = '';
    }

    $scope.setListView = function () {
      $scope.view = 'listview';
      $scope.listViewActive = 'active';
      $scope.tableViewActive = '';
    };
    $scope.setTableView = function () {
      $scope.view = 'tableview';
      $scope.listViewActive = '';
      $scope.tableViewActive = 'active';
    };

    $scope.sort = function (prop) {
      console.log(prop);
      $scope.orderBy = prop;
    };
  }];
};

function createEditController(params) {
  return ['$scope', '$window', '$routeParams', 'countryNameFilter', 'AddressBook', function ($scope, $window, $routeParams, $filter, AddressBook) {
    $scope.mode = params.mode;
    //console.log(arguments);
    if (params.mode === 'new') {
      $scope.entry = {};
    } else {
      $scope.entry = AddressBook.get({ id: $routeParams.entryId }, function (entry) {
        if (!entry) {
          $window.location = '#/error404';
          return;
        }
        $scope.countryname = _typeof($filter === 'function') && entry ? $filter(entry.countrycode) : '';
        if ($window && typeof $window.onEditView === 'function') {
          $window.onEditView($scope);
        }
      });
    }
    $scope.saveEntry = function () {
      $scope.validationError = '';
      AddressBook.save($scope.entry, function (saved) {
        if (!saved) {
          $scope.validationError = AddressBook.validate($scope.entry).err;
        } else {
          if ($window) {
            $window.location = '#/entries/' + saved.id;
          }
        }
      });
    };
    $scope.deleteEntry = function () {
      AddressBook.delete($scope.entry);
    };
    if ($window && typeof $window.onEditView === 'function') {
      $window.onEditView($scope);
    }
  }];
};

_controllers.controller('AddressListCtl', createListController({ edit: false }));
_controllers.controller('AddressListEditCtl', createListController({ edit: true }));

_controllers.controller('AddressNewCtl', createEditController({ mode: 'new' }));
_controllers.controller('AddressEditCtl', createEditController({ mode: 'edit' }));
_controllers.controller('AddressDetailCtl', createEditController({ mode: 'detail' }));
_controllers.controller('AddressDeleteCtl', createEditController({ mode: 'delete' }));